'use client';

import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { SkillsSection } from '@/components/skills-section';
import { ExperienceSection } from '@/components/experience-section';
import { Footer } from '@/components/footer';
import { ScrollProgress } from '@/components/scroll-progress';
import { useActiveSection } from '@/hooks/use-active-section';

export default function Home() {
  const activeSection = useActiveSection();

  return (
    <>
      <ScrollProgress />
      <Navigation activeSection={activeSection} />

      <main className="relative">
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
      </main>

      <Footer />
    </>
  );
}
