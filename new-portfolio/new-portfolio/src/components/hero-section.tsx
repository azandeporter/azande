'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Linkedin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
}

function FloatingParticle({ x, y, size, opacity, delay }: ParticleProps) {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-gold to-gold-bright"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, opacity, 0],
        scale: [0, 1, 0],
        y: [0, -100, -200],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
      }}
    />
  );
}

function BackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/2 right-1/3 w-2 h-2 bg-gold/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

function TypewriterText() {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const fullName = 'Azande Porter';

  useEffect(() => {
    if (displayText.length < fullName.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullName.substring(0, displayText.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [displayText, fullName]);

  return (
    <span className="relative text-gradient">
      {displayText}
      {!isComplete && (
        <motion.span
          className="inline-block w-0.5 h-8 ml-1 bg-gold"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}
    </span>
  );
}

export function HeroSection() {
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<ParticleProps[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const generateParticles = useCallback((clientX: number, clientY: number) => {
    const rect = document.getElementById('hero')?.getBoundingClientRect();
    if (!rect) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newParticles = Array.from({ length: 3 }, (_, i) => ({
      x: x + (Math.random() - 0.5) * 50,
      y: y + (Math.random() - 0.5) * 50,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.6 + 0.4,
      delay: i * 0.1,
    }));

    setParticles(prev => [...prev.slice(-20), ...newParticles]);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);

    if (Math.random() > 0.9) {
      generateParticles(e.clientX, e.clientY);
    }
  }, [mouseX, mouseY, generateParticles]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-background/95"
      onMouseMove={handleMouseMove}
    >
      <BackgroundShapes />

      {/* Interactive Particles */}
      {particles.map((particle, index) => (
        <FloatingParticle
          key={`${Date.now()}-${index}`}
          {...particle}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Main Heading */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm font-medium text-gold tracking-wider uppercase"
              >
                Welcome to my world
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="block text-foreground">Hi, I&apos;m</span>
                <span className="block min-h-[1.2em]">
                  <TypewriterText />
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                Just a human obsessed with technology, culture, and the endless possibilities they create.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed max-w-2xl"
              >
                I&apos;m a software engineer interested in cloud-native solutions and back-end
                development, with a flair for building scalable and efficient systems that create meaningful impact.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-gold to-gold-bright text-gold-foreground hover:opacity-90 transition-all duration-300 group relative overflow-hidden"
              >
                <a
                  href="#skills"
                  className="flex items-center justify-center gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="relative z-10">View My Skills</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gold-bright to-gold"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gold/30 text-gold hover:bg-gold hover:text-gold-foreground transition-all duration-300 group"
              >
                <a
                  href="https://linkedin.com/in/azandeporter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  Connect
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </Button>
            </motion.div>

          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              style={{ rotateX, rotateY, transformPerspective: 1200 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative w-80 h-80 lg:w-96 lg:h-96"
              >
                {/* Glowing background */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 via-gold-bright/10 to-transparent blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Image container */}
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden border-4 border-gold/30 shadow-2xl"
                  whileHover={{
                    borderColor: 'var(--gold)',
                    boxShadow: '0 0 40px var(--gold)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/assets/myprofilee.JPG"
                    alt="Azande Porter - Software Engineer"
                    fill
                    className="object-cover"
                    priority
                    quality={95}
                    sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, 500px"
                  />

                  {/* Overlay gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center text-gold/70 hover:text-gold transition-colors duration-300 cursor-pointer"
          onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs mb-2 font-medium"></span>
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}