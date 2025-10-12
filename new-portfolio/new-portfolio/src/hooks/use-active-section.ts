'use client';

import { useEffect, useState } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'skills', 'experience'];
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0.2],
        rootMargin: '-10% 0px -30% 0px',
      }
    );

    sectionElements.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionElements.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return activeSection;
}