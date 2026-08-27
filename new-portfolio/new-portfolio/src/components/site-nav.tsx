'use client';

import Image from 'next/image';
import { useActiveSection } from '@/hooks/use-active-section';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'interests', label: 'Interests' },
  { id: 'contact', label: 'Contact' },
];

// Hoisted so the observer effect is not rebuilt on every render.
const sectionIds = sections.map((section) => section.id);

export function SiteNav() {
  const active = useActiveSection(sectionIds);

  return (
    <aside className="md:w-[200px] md:shrink-0">
      <div className="md:sticky md:top-16">
        {/* The name sits here on mobile and in the main column on desktop.
            On desktop the mark is nudged right by the width of the nav dot and
            its gutter (4px + 8px) so its left edge lines up with the labels. */}
        <div className="mb-8 flex items-center gap-3 md:mb-16 md:ml-3">
          <a href="#about" aria-label="Azande Porter, back to top" className="inline-block shrink-0">
            <Image
              src="/assets/personalllogo.png"
              alt=""
              width={36}
              height={36}
              priority
              className="h-9 w-9 object-contain"
            />
          </a>
          <p className="text-sm uppercase tracking-[0.14em] text-fg md:hidden">
            Azande Porter
          </p>
        </div>

        <nav aria-label="Sections">
          <ul className="flex flex-row gap-5 md:flex-col md:gap-1">
            {sections.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id} className="flex items-center">
                  <span
                    aria-hidden
                    className={`mr-2 hidden h-[4px] w-[4px] rounded-full transition-transform md:block ${
                      isActive ? 'scale-125 bg-accent' : 'scale-0 bg-accent'
                    }`}
                  />
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`py-1 text-sm transition-opacity ${
                      isActive ? 'text-accent' : 'text-muted hover:opacity-60'
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
