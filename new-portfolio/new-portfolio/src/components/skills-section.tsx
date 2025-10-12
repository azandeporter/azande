'use client';

import { useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { 
  Server, 
  Cloud, 
  TestTube,
  Workflow,
  Layers
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  skills: string[];
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

function SkillCard({ icon, title, description, skills, index, isHovered, onHover }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onHover(null);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ 
        rotateX: isHovered ? rotateX : 0, 
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer"
    >
      <Card className="relative p-6 h-full bg-card/50 backdrop-blur-sm border-gold/60 hover:border-gold transition-all duration-500 overflow-hidden">
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold-bright/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(45deg, transparent, var(--gold), transparent)',
            mask: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
            maskComposite: 'exclude',
            padding: '1px',
          }}
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ 
            opacity: isHovered ? 0.3 : 0,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 2, ease: 'linear' }}
        />

        <div className="relative z-10 space-y-4">
          {/* Icon */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-gold/20 to-gold-bright/10 text-gold group-hover:from-gold/30 group-hover:to-gold-bright/20 transition-all duration-300"
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill, skillIndex) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                className="px-2 py-1 text-xs font-medium bg-secondary/50 text-secondary-foreground rounded-md hover:bg-gold/20 hover:text-gold transition-all duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Floating particles */}
        {isHovered && (
          <>
            {Array.from({ length: 3 }).map((_, particleIndex) => (
              <motion.div
                key={particleIndex}
                className="absolute w-1 h-1 bg-gold rounded-full pointer-events-none"
                initial={{
                  x: Math.random() * 300,
                  y: Math.random() * 200,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  y: [null, -50, -100],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: particleIndex * 0.2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                }}
              />
            ))}
          </>
        )}
      </Card>
    </motion.div>
  );
}

export function SkillsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const skills = [
    {
      icon: <Server className="w-6 h-6" />,
      title: 'Backend Development',
      description: 'Scalable server-side programming with robust architecture and efficient data processing.',
      skills: ['Python', 'Go', 'Django/Flask', 'RESTful APIs', 'Microservices']
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: 'Cloud Computing',
      description: 'Working with cloud-native technologies for scalable, resilient, and cost-effective solutions.',
      skills: ['Amazon Web Services (AWS)', 'Microsoft Azure', 'Docker', 'Kubernetes', 'Serverless',]
    },
    {
      icon: <Workflow className="w-6 h-6" />,
      title: 'Infrastructure as Code',
      description: 'Automating infrastructure deployment and management through code-based approaches.',
      skills: ['Terraform', 'AWS CloudFormation', 'CI/CD', 'GitHub Actions', 'Infrastructure Automation']
    },
    {
      icon: <TestTube className="w-6 h-6" />,
      title: 'Testing & Quality',
      description: 'Implementing comprehensive testing strategies to ensure code reliability and maintainability.',
      skills: ['Unit Testing (Pytest)', 'Integration Testing', 'Test-Driven Development', 'Code Quality', 'Performance Testing']
    }
  ];

  return (
    <section id="skills" className="relative py-20 lg:py-32 overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium"
          >
            <Layers className="w-4 h-4" />
            Skills & Expertise
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Technologies I Use to Build
            <span className="block text-gradient">Impactful Solutions</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive skillset spanning backend, cloud infrastructure, 
            and modern development practices to deliver exceptional results.
          </p>
        </motion.div>

        {/* Skills Grid - Pyramid Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          {/* Top Row - Backend Development */}
          <div className="flex justify-center mb-6 lg:mb-8">
            <div className="w-full max-w-sm">
              <SkillCard
                {...skills[0]}
                index={0}
                isHovered={hoveredCard === 0}
                onHover={setHoveredCard}
              />
            </div>
          </div>
          
          {/* Bottom Row - Three Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {skills.slice(1).map((skill, index) => (
              <div key={skill.title} className="w-full max-w-sm mx-auto">
                <SkillCard
                  {...skill}
                  index={index + 1}
                  isHovered={hoveredCard === index + 1}
                  onHover={setHoveredCard}
                />
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}