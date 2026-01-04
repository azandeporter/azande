'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ExperienceItemProps {
  title: string;
  company: string;
  location: string;
  duration: string;
  current?: boolean;
  description?: string;
  achievements?: string[];
  index: number;
  isLast?: boolean;
}

function ExperienceItem({ 
  title, 
  company, 
  location, 
  duration, 
  current, 
  description, 
  achievements, 
  index,
  isLast 
}: ExperienceItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.2 });

  const staggerDelay = index * 0.15;

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: staggerDelay }}
      className="group"
    >
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
        {/* Left column - Timeline */}
        <motion.div 
          className="lg:col-span-4 flex lg:flex-col items-start gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: staggerDelay + 0.05 }}
        >
          <div className="flex-1 lg:text-right">
            <h3 className="font-serif text-xl lg:text-2xl text-foreground group-hover:text-gold transition-colors duration-300">
              {company}
            </h3>
            <div className="flex lg:justify-end items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span>{location}</span>
              <span className="text-gold/40">—</span>
              <span>{duration}</span>
            </div>
          </div>
        </motion.div>

        {/* Center - Timeline indicator */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center">
          {/* Dot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: staggerDelay + 0.1 }}
            className="relative"
          >
            <div className={`w-3 h-3 rounded-full border-2 ${
              current 
                ? 'bg-gold border-gold' 
                : 'bg-background border-gold/40 group-hover:border-gold'
            } transition-colors duration-300`} />
            
            {current && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gold/30"
                animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </motion.div>
          
          {/* Line */}
          {!isLast && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: staggerDelay + 0.15 }}
              className="w-px flex-1 bg-gradient-to-b from-gold/40 to-border/20 mt-3"
              style={{ minHeight: '120px' }}
            />
          )}
        </div>

        {/* Right column - Content */}
        <motion.div 
          className="lg:col-span-7"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: staggerDelay + 0.1 }}
        >
          <div className="relative p-6 lg:p-8 border border-border/40 bg-card/20 backdrop-blur-sm hover:border-gold/20 hover:bg-card/40 transition-colors duration-300">
            {/* Current badge */}
            {current && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: staggerDelay + 0.2 }}
                className="absolute -top-3 right-6 px-4 py-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black text-xs uppercase tracking-[0.15em] font-semibold shadow-lg shadow-amber-500/20"
              >
                Current
              </motion.div>
            )}

            {/* Role */}
            <div className="mb-4">
              <h4 className="text-lg lg:text-xl font-medium text-foreground">
                {title}
              </h4>
            </div>

            {/* Description */}
            {description && (
              <p className="text-muted-foreground leading-relaxed mb-6">
                {description}
              </p>
            )}

            {/* Achievements */}
            {achievements && achievements.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-px bg-gold/40" />
                  <span className="text-xs uppercase tracking-[0.15em] text-gold-muted font-medium">
                    Key Contributions
                  </span>
                </div>
                
                <ul className="space-y-3">
                  {achievements.map((achievement, achievementIndex) => (
                    <motion.li
                      key={achievementIndex}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ 
                        duration: 0.4, 
                        delay: staggerDelay + 0.2 + achievementIndex * 0.05
                      }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const experiences = [
    {
      title: 'Software Engineer I',
      company: 'LexisNexis Risk Solutions',
      location: 'Atlanta, GA',
      duration: 'June 2025 — Present',
      current: true,
      description: 'Contributing to cloud-native solutions and enterprise-scale applications.'
    },
    {
      title: 'DevOps Software Developer Intern',
      company: 'SAS',
      location: 'Cary, NC',
      duration: 'Summer 2024',
      achievements: [
        'Architected a RESTful service integrated into CI/CD workflows, orchestrating 1,000+ concurrent builds for SAS Viya.',
        'Established test-driven development practices with pytest, automating functional and integration testing.',
        'Enhanced delivery infrastructure using Kubernetes for container orchestration, improving packaging efficiency.'
      ]
    },
    {
      title: 'Software Engineer Intern',
      company: 'TIAA',
      location: 'Charlotte, NC',
      duration: 'Summer 2023',
      achievements: [
        'Designed an internal workflow management system using Python, JavaScript, and HTML—measurably increasing team productivity.',
        'Enhanced cluster workflows through REST API integration in a Flask-based application, improving cross-datacenter performance.',
        'Developed scalable solutions that doubled application capacity while maintaining reliability under increased load.'
      ]
    }
  ];

  return (
    <section id="experience" className="relative py-32 lg:py-40 overflow-hidden grain" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-amber/[0.02] rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
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
              Experience
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.1] mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block text-foreground">A growing journey in</span>
            <span className="block text-gradient font-italic">software engineering</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From internships to full-time roles, I've built skills across enterprise 
            systems, cloud infrastructure, and development environments.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12 lg:space-y-0">
          {experiences.map((experience, index) => (
            <ExperienceItem
              key={`${experience.company}-${experience.title}`}
              {...experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 lg:mt-32 text-center"
        >
          <div className="max-w-xl mx-auto space-y-8">
            <div className="flex items-center justify-center gap-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/30" />
              <span className="font-serif italic text-xl lg:text-2xl text-foreground">
                Let&apos;s connect
              </span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/30" />
            </div>
            
            <p className="text-muted-foreground">
              Always interested in discussing technology and meeting new people!
            </p>
            
            <a
              href="https://linkedin.com/in/azandeporter"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold-muted text-gold-foreground font-medium tracking-wide group hover:bg-gold transition-colors duration-300"
            >
              <span>Connect on LinkedIn</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
