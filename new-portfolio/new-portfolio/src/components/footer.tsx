'use client';

import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-card/30 backdrop-blur-sm border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Back to Top Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="border-gold/30 text-gold hover:bg-gold hover:text-gold-foreground transition-all duration-300 group"
            >
              <ArrowUp className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform duration-300" />
              Back to Top
            </Button>
          </motion.div>


          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center space-y-2"
          >
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Azande Porter. All rights reserved.
            </p>
          </motion.div>

        </div>
      </div>

      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
    </footer>
  );
}