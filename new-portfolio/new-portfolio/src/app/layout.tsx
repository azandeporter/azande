import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-src",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif-src",
  display: "swap",
});

const description =
  "Azande Porter is a Site Reliability Engineer II at LexisNexis Risk Solutions, building and running cloud infrastructure across production platforms on Azure AKS with Terraform, Helm, and Argo CD.";

export const metadata: Metadata = {
  metadataBase: new URL("https://azandeporter.com"),
  title: {
    default: "Azande Porter",
    template: "%s · Azande Porter",
  },
  description,
  authors: [{ name: "Azande Porter", url: "https://azandeporter.com" }],
  creator: "Azande Porter",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://azandeporter.com",
    siteName: "Azande Porter",
    title: "Azande Porter",
    description,
  },
  twitter: {
    card: "summary",
    title: "Azande Porter",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://azandeporter.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
