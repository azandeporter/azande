'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks the section the reader is currently in: the last one whose top has
 * crossed a marker line near the top of the viewport.
 *
 * Scroll position is used rather than IntersectionObserver because a short
 * final section can never cross an observer band once the page stops
 * scrolling; the explicit bottom-of-page case below resolves that.
 */
export function useActiveSection(ids: string[]) {
  const [activeSection, setActiveSection] = useState(ids[0] ?? '');

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      const elements = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      if (elements.length === 0) return;

      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      if (scrolledToBottom) {
        setActiveSection(elements[elements.length - 1].id);
        return;
      }

      // Sections anchor 5rem below the viewport top (html scroll-padding-top),
      // so the marker must sit below that or a clicked link never activates.
      const markerLine = Math.max(96, window.innerHeight * 0.25);
      let current = elements[0].id;

      for (const element of elements) {
        if (element.getBoundingClientRect().top <= markerLine) {
          current = element.id;
        }
      }

      setActiveSection(current);
    };

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ids]);

  return activeSection;
}
