'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

function MagneticButton({ 
  children, 
  href, 
  external = false,
  variant = 'primary' 
}: { 
  children: React.ReactNode; 
  href: string;
  external?: boolean;
  variant?: 'primary' | 'secondary';
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses = variant === 'primary'
    ? "relative px-8 py-4 bg-gold-muted text-gold-foreground font-medium tracking-wide overflow-hidden group hover:bg-gold transition-colors duration-300"
    : "relative px-8 py-4 border border-foreground/30 text-foreground font-medium tracking-wide overflow-hidden group hover:border-foreground/60";

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={baseClasses}
    >
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <svg 
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </motion.a>
  );
}

function EditorialNumber({ number, label, delay }: { number: string; label: string; delay: number }) {
  return (
    <motion.div 
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      <span className="font-serif text-4xl lg:text-5xl italic text-gold">{number}</span>
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{label}</span>
    </motion.div>
  );
}

function TypewriterText() {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const fullName = 'Azande Porter';

  useEffect(() => {
    const startDelay = setTimeout(() => {
      if (displayText.length < fullName.length) {
        const timer = setTimeout(() => {
          setDisplayText(fullName.substring(0, displayText.length + 1));
        }, 65);
        return () => clearTimeout(timer);
      } else {
        setIsComplete(true);
      }
    }, displayText.length === 0 ? 400 : 0);
    
    return () => clearTimeout(startDelay);
  }, [displayText, fullName]);

  return (
    <span className="relative inline-flex items-baseline">
      <span 
        className="bg-gradient-to-r from-champagne via-gold to-amber bg-clip-text"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: displayText ? 'transparent' : 'var(--gold)',
        }}
      >
        {displayText || '\u00A0'}
      </span>
      {!isComplete && (
        <motion.span
          className="inline-block w-[3px] h-[0.85em] ml-1 bg-gold"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}
    </span>
  );
}

export function HeroSection() {
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [2, -2]);
  const rotateY = useTransform(mouseX, [-300, 300], [-2, 2]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden grain"
      onMouseMove={handleMouseMove}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/30" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/[0.02] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-card/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Content - 7 columns */}
          <div className="lg:col-span-7 space-y-10">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-4"
            >
              <motion.div 
                className="w-12 h-px bg-gradient-to-r from-gold to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ transformOrigin: 'left' }}
              />
              <span className="text-xs uppercase tracking-[0.3em] text-gold-muted font-medium">
                Software Engineer
              </span>
            </motion.div>

            {/* Main headline */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-muted-foreground text-lg lg:text-xl font-light"
              >
                Hey there, I&apos;m
              </motion.p>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif leading-[0.95] tracking-tight">
                <span className="block text-gradient">
                  <TypewriterText />
                </span>
              </h1>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-xl space-y-6"
            >
              <p className="text-xl lg:text-2xl text-foreground/90 font-light leading-relaxed">
                Technologist specializing in building  
                <span className="font-serif italic text-gold"> cloud-native solutions</span> 
                {" "}and scalable systems.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <MagneticButton href="#experience" variant="primary">
                View Experience
              </MagneticButton>
              
              <MagneticButton href="https://linkedin.com/in/azandeporter" external variant="secondary">
                LinkedIn
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <div className="flex gap-12 pt-8 border-t border-border/50">
              <EditorialNumber number="2+" label="Years Exp" delay={0.5} />
              <EditorialNumber number="∞" label="Curiosity" delay={0.6} />
            </div>
          </div>

          {/* Portrait - 5 columns */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              style={{ rotateX, rotateY, transformPerspective: 1200 }}
              className="relative"
            >
              {/* Decorative frames */}
              <motion.div 
                className="absolute -inset-4 border border-gold/20 -rotate-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.div 
                className="absolute -inset-8 border border-gold/10 rotate-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              />
              
              {/* Main image container */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative w-72 h-96 sm:w-80 sm:h-[28rem] lg:w-96 lg:h-[32rem]"
              >
                {/* Ambient glow */}
                <motion.div
                  className="absolute -inset-12 bg-gradient-to-br from-gold/10 via-amber/5 to-transparent blur-3xl"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Image */}
                <div className="relative w-full h-full overflow-hidden bg-card">
                  <Image
                    src="/assets/myprofilee.JPG"
                    alt="Azande Porter"
                    fill
                    className="object-cover"
                    priority
                    quality={95}
                    sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                  
                  {/* Corner accent */}
                  <motion.div 
                    className="absolute bottom-0 right-0 w-16 h-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/40" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3 cursor-pointer group"
          onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground group-hover:text-gold transition-colors">
            Learn more
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
