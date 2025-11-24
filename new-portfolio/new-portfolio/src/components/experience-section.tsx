'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Building2, 
  Calendar,
  MapPin,
  ExternalLink,
  CheckCircle,
  Code,
  TrendingUp,
  Zap
} from 'lucide-react';
import { Card } from '@/components/ui/card';

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
  const isInView = useInView(itemRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        {/* Timeline Dot */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
          className={`w-4 h-4 rounded-full border-4 z-10 ${
            current 
              ? 'bg-gold border-gold shadow-lg glow-gold' 
              : 'bg-card border-gold/50 hover:border-gold transition-all duration-300'
          }`}
        >
          {current && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-full h-full rounded-full bg-gold"
            />
          )}
        </motion.div>
        
        {/* Timeline Line */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
            className="w-0.5 bg-gradient-to-b from-gold/50 to-border min-h-20"
          />
        )}
      </div>

      {/* Content */}
      <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8 lg:ml-auto'}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-gold/30 transition-all duration-300 relative overflow-hidden group">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="text-sm font-medium text-gold">{company}</span>
                    {current && (
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="px-2 py-1 text-xs bg-gradient-to-r from-gold/20 to-gold-bright/20 text-gold rounded-full border border-gold/30"
                      >
                        Current
                      </motion.div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
                    {title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {duration}
                    </div>
                  </div>
                </div>

                {/* Company Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold-bright/10 flex items-center justify-center flex-shrink-0"
                >
                  <Code className="w-6 h-6 text-gold" />
                </motion.div>
              </div>

              {/* Description */}
              {description && (
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              )}

              {/* Achievements */}
              {achievements && achievements.length > 0 && (
                <div className="space-y-3">
                  <h4 className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <TrendingUp className="w-4 h-4 text-gold" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {achievements.map((achievement, achievementIndex) => (
                      <motion.li
                        key={achievementIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.2 + 0.6 + achievementIndex * 0.1 
                        }}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.2 + 0.7 + achievementIndex * 0.1 
                          }}
                        >
                          <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        </motion.div>
                        <span className="leading-relaxed">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Hover Effects */}
            <motion.div
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-gold-bright"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Card>
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
      duration: 'June 2025 - Present',
      current: true,
      description: 'Recently joined to contribute to cloud-native solutions and enterprise-scale applications.',
    },
    {
      title: 'DevOps Software Developer Intern',
      company: 'SAS',
      location: 'Cary, NC',
      duration: 'Summer 2024',
      achievements: [
        'Adapted a RESTful service integrated into CI/CD workflows, managing 1,000+ concurrent builds for SAS Viya.',
        'Implemented test-driven development in Python using pytest to automate functional and integration testing.',
        'Enhanced software delivery using Kubernetes for container orchestration, improving packaging efficiency.'
      ]
    },
    {
      title: 'Software Engineer Intern',
      company: 'TIAA',
      location: 'Charlotte, NC',
      duration: 'Summer 2023',
      achievements: [
        'Designed and implemented an internal workflow management system in Python, JavaScript, and HTML, increasing productivity.',
        'Enhanced cluster workflows by integrating REST APIs into a Flask-based web application, improving performance across data centers.',
        'Developed scalable solutions that doubled application capacity, ensuring reliability under increased load.'
      ]
    }
  ];

  return (
    <section id="experience" className="relative py-20 lg:py-32 overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium"
          >
            <Zap className="w-4 h-4" />
            Professional Experience
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight sm:leading-tight lg:leading-[1.15]">
            My Journey in
            <span className="block text-gradient mt-1">Software Engineering</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From internships to full-time roles, here&apos;s how I&apos;ve grown as a software engineer 
            and contributed to meaningful projects across different industries.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-12 lg:space-y-16">
          {experiences.map((experience, index) => (
            <ExperienceItem
              key={`${experience.company}-${experience.title}`}
              {...experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-20"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-xl font-semibold text-foreground">
              Ready to Collaborate?
            </h3>
            
            <p className="text-muted-foreground">
              I&apos;m always excited to work on interesting projects and connect with other technologists. 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://linkedin.com/in/azandeporter"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold to-gold-bright text-gold-foreground font-medium hover:opacity-90 transition-opacity duration-300"
              >
                Connect on LinkedIn
                <ExternalLink className="w-4 h-4" />
              </motion.a>
              
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}