const sharp = require('sharp');
const fs = require('fs');

const SRC = 'public/assets/personalllogo.png';
const BG = { r: 10, g: 10, b: 11, alpha: 1 };
// Ink bounds of the glyph inside the source PNG, measured not guessed.
const INK = { minX: 205, minY: 114, maxX: 1365, maxY: 1289 };

async function glyphMask() {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, channels: c } = info;
  const iw = INK.maxX - INK.minX + 1;
  const ih = INK.maxY - INK.minY + 1;
  const out = Buffer.alloc(iw * ih);
  // Source is a white script glyph on black. Use luminance as the mask so the
  // mark can be composited onto an exact brand square with no black seam.
  for (let y = 0; y < ih; y++) {
    for (let x = 0; x < iw; x++) {
      const si = ((y + INK.minY) * w + (x + INK.minX)) * c;
      const lum = data[si] * 0.299 + data[si + 1] * 0.587 + data[si + 2] * 0.114;
      out[y * iw + x] = Math.round((lum / 255) * (data[si + 3] / 255) * 255);
    }
  }
  return { buf: out, w: iw, h: ih };
}

// Grayscale dilation (max over a separable square window). Thickens hairline
// strokes before downsampling so they survive; alpha scaling alone cannot
// keep thin strokes connected.
function dilate(mask, w, h, r) {
  if (r <= 0) return mask;
  const tmp = Buffer.alloc(w * h);
  const out = Buffer.alloc(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let m = 0;
      for (let d = -r; d <= r; d++) {
        const xx = x + d;
        if (xx < 0 || xx >= w) continue;
        const v = mask[y * w + xx];
        if (v > m) m = v;
      }
      tmp[y * w + x] = m;
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let m = 0;
      for (let d = -r; d <= r; d++) {
        const yy = y + d;
        if (yy < 0 || yy >= h) continue;
        const v = tmp[yy * w + x];
        if (v > m) m = v;
      }
      out[y * w + x] = m;
    }
  }
  return out;
}

function toRgba(mask, w, h) {
  const out = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    out[i * 4] = 255;
    out[i * 4 + 1] = 255;
    out[i * 4 + 2] = 255;
    out[i * 4 + 3] = mask[i];
  }
  return out;
}

// Smaller targets need more stroke weight and a stronger alpha gamma, chosen
// by rendering the candidates and comparing them rather than by formula.
const CFG = {
  16: { dilate: 14, gamma: 0.65, pad: 0.03 },
  32: { dilate: 10, gamma: 0.7, pad: 0.05 },
  48: { dilate: 6, gamma: 0.8, pad: 0.07 },
  180: { dilate: 0, gamma: 1, pad: 0.14 },
  512: { dilate: 0, gamma: 1, pad: 0.14 },
};

async function render(size, glyph) {
  const cfg = CFG[size];
  const mask = dilate(glyph.buf, glyph.w, glyph.h, cfg.dilate);
  const rgba = toRgba(mask, glyph.w, glyph.h);

  const box = Math.round(size * (1 - cfg.pad * 2));
  const scale = Math.min(box / glyph.w, box / glyph.h);
  const gw = Math.max(1, Math.round(glyph.w * scale));
  const gh = Math.max(1, Math.round(glyph.h * scale));

  const rs = await sharp(rgba, { raw: { width: glyph.w, height: glyph.h, channels: 4 } })
    .resize(gw, gh, { fit: 'fill', kernel: 'lanczos3' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = Buffer.from(rs.data);
  if (cfg.gamma !== 1) {
    for (let i = 3; i < px.length; i += 4) {
      px[i] = Math.round(255 * Math.pow(px[i] / 255, cfg.gamma));
    }
  }

  const glyphPng = await sharp(px, {
    raw: { width: rs.info.width, height: rs.info.height, channels: 4 },
  })
    .png()
    .toBuffer();

  return sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: glyphPng, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// Multi-size ICO with PNG payloads, so the browser picks the right entry for
// its device pixel ratio instead of rescaling one bitmap.
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);
  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;
  entries.forEach((e, i) => {
    const o = i * 16;
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, o);
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, o + 1);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(e.png.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += e.png.length;
  });
  return Buffer.concat([header, dir, ...entries.map((e) => e.png)]);
}

(async () => {
  const glyph = await glyphMask();
  const ico = [];
  for (const size of [16, 32, 48]) ico.push({ size, png: await render(size, glyph) });

  // Next.js app-router file conventions: these three emit their own <link>
  // tags, which is why the scaffold favicon.ico previously won.
  fs.writeFileSync('src/app/favicon.ico', buildIco(ico));
  fs.writeFileSync('src/app/apple-icon.png', await render(180, glyph));
  fs.writeFileSync('src/app/icon.png', await render(512, glyph));

  fs.mkdirSync('/tmp/apres/final', { recursive: true });
  for (const size of [16, 32, 48]) {
    const buf = await render(size, glyph);
    fs.writeFileSync('/tmp/apres/final/' + size + '.png', buf);
  }
  console.log('favicon.ico', fs.statSync('src/app/favicon.ico').size, 'bytes');
})();

