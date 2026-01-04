'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface SkillDomainProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  index: number;
}

function SkillDomain({ number, title, subtitle, description, technologies, index }: SkillDomainProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.03);
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.03);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Stagger delay based on grid position
  const staggerDelay = index * 0.1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: staggerDelay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group"
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className="relative p-8 lg:p-10 border border-border/40 bg-card/30 backdrop-blur-sm transition-colors duration-300 hover:border-gold/30 hover:bg-card/50"
      >
        {/* Hover gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] via-transparent to-amber/[0.02]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <span className="font-serif text-5xl lg:text-6xl italic text-gold/60 group-hover:text-gold transition-colors duration-300">
              {number}
            </span>
            
            {/* Corner decoration */}
            <div className="w-8 h-8 relative">
              <div className="absolute top-0 right-0 w-full h-full border-t border-r border-gold/20 group-hover:border-gold/40 transition-colors duration-300" />
            </div>
          </div>

          {/* Title block */}
          <div className="mb-6">
            <h3 className="text-2xl lg:text-3xl font-serif text-foreground mb-1">
              {title}
            </h3>
            <p className="text-sm uppercase tracking-[0.2em] text-gold-muted">
              {subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
            {description}
          </p>

          {/* Technologies */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-gradient-to-r from-gold/40 to-transparent" />
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Stack</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {(technologies || []).map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: staggerDelay + 0.1 + i * 0.03 }}
                  className="px-3 py-1.5 text-xs font-medium bg-secondary/60 text-secondary-foreground border border-border/30 hover:border-gold/30 hover:text-gold transition-colors duration-200"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-gold to-champagne"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    </motion.div>
  );
}

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const domains = [
    {
      number: '01',
      title: 'Backend Systems',
      subtitle: 'Server Architecture',
      description: 'Engineering robust server-side solutions with emphasis on performance, maintainability, and elegant API design.',
      technologies: ['Python', 'Go', 'TypeScript', 'Django', 'Flask', 'REST APIs']
    },
    {
      number: '02',
      title: 'Cloud Infrastructure',
      subtitle: 'Distributed Computing',
      description: 'Building cloud-native applications that scale while maintaining operational stability.',
      technologies: ['AWS', 'Azure', 'Terraform', 'Docker', 'Kubernetes', 'Networking Protocols']
    },
    {
      number: '03',
      title: 'DevOps Tools',
      subtitle: 'Continuous Delivery',
      description: 'Implementing DevOps practices and CI/CD pipelines that accelerate development velocity.',
      technologies: ['GitHub Actions', 'Kubernetes', 'HashiCorp Vault', 'Prometheus', 'JFrog Artifactory']
    }
  ];

  return (
    <section id="skills" className="relative py-32 lg:py-40 overflow-hidden grain" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/5 to-background" />
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-gold/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20 lg:mb-28"
        >
          {/* Eyebrow */}
          <motion.div 
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div 
              className="w-12 h-px bg-gradient-to-r from-gold to-transparent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{ transformOrigin: 'left' }}
            />
            <span className="text-xs uppercase tracking-[0.3em] text-gold-muted font-medium">
              Expertise
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.1] mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block text-foreground">Technologies I use to</span>
            <span className="block text-gradient font-italic">build</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A curated toolkit spanning backend engineering, cloud infrastructure, 
            and modern development practices.
          </motion.p>
        </motion.div>

        {/* Skills grid - 2 on top, 1 centered below */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {domains.slice(0, 2).map((domain, index) => (
            <SkillDomain key={domain.number} {...domain} index={index} />
          ))}
        </div>
        
        {/* Third card centered */}
        <div className="flex justify-center mt-6 lg:mt-8">
          <div className="w-full md:w-1/2 md:max-w-none">
            {domains.slice(2).map((domain, index) => (
              <SkillDomain key={domain.number} {...domain} index={index + 2} />
            ))}
          </div>
        </div>

        {/* Bottom flourish */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mt-20"
        >
          <div className="flex items-center gap-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <span className="font-serif italic text-gold/60 text-sm">& always learning</span>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
