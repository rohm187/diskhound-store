
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock, Zap } from 'lucide-react';

export function CTASection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-cyber font-bold">
              <span className="neon-text">STOP LOSING DISCS</span>
              <br />
              <span className="secondary-neon">START PLAYING FEARLESS</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Join thousands of disc golfers who never worry about lost discs anymore. 
              Get instant alerts, track every disc, play with confidence.
            </p>
          </div>

          {/* Key benefits reminder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 py-8"
          >
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-foreground/80">Waterproof & Durable</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-6 w-6 text-secondary" />
              <span className="text-foreground/80">5+ Year Battery</span>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="h-6 w-6 text-accent" />
              <span className="text-foreground/80">Under 3g Weight</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/products">
              <Button size="lg" className="btn-cyber text-lg px-10 py-6 pulse-neon">
                Get DiskHound Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <div className="text-center">
              <div className="flex items-baseline space-x-2 justify-center">
                <span className="text-2xl font-cyber font-bold neon-text">Starting at $9.99</span>
                <span className="text-lg text-foreground/60 line-through">$14.99</span>
              </div>
              <div className="text-sm text-foreground/60 mt-1">
                Free shipping • 30-day guarantee
              </div>
            </div>
          </motion.div>

          {/* Urgency/Scarcity */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="inline-flex items-center space-x-2 bg-secondary/10 rounded-full px-6 py-3 border border-secondary/30"
          >
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">
              Limited time launch pricing - Save 33% today
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
