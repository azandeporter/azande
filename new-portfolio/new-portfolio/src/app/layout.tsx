import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Azande Porter - Software Engineer",
    template: "%s | Azande Porter"
  },
  description: "Software engineer passionate about cloud-native solutions, backend development, and building scalable systems. Currently at LexisNexis Risk Solutions, with experience in Python, Go, AWS, and Kubernetes.",
  keywords: [
    "Software Engineer",
    "Cloud Computing",
    "Backend Development", 
    "Python",
    "Go",
    "AWS",
    "Kubernetes",
    "DevOps",
    "Full Stack Developer",
    "Atlanta"
  ],
  authors: [{ name: "Azande Porter" }],
  creator: "Azande Porter",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://azandeporter.com",
    title: "Azande Porter - Software Engineer",
    description: "Software engineer passionate about cloud-native solutions and building scalable systems.",
    siteName: "Azande Porter Portfolio",
    images: [
      {
        url: "/assets/myprofilee.JPG",
        width: 1200,
        height: 630,
        alt: "Azande Porter - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Azande Porter - Software Engineer",
    description: "Software engineer passionate about cloud-native solutions and building scalable systems.",
    images: ["/assets/myprofilee.JPG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "verification-code-here", // Add your Google Search Console verification code
  },
  alternates: {
    canonical: "https://azandeporter.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="icon" href="/assets/personalllogo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/assets/personalllogo.png" />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
