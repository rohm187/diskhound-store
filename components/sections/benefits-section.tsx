
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, Smartphone, Zap, Shield, Clock, MapPin } from 'lucide-react';

const benefits = [
  {
    icon: CheckCircle,
    title: 'Never Lose A Disc Again',
    description: 'Every disc is trackable. When someone finds your disc, you get instant alerts.',
    feature: 'Instant Recovery'
  },
  {
    icon: Smartphone,
    title: 'Instant Phone Alerts',
    description: 'NFC tap sends your contact info directly to the finder\'s phone. No apps required.',
    feature: 'Zero Friction'
  },
  {
    icon: MapPin,
    title: 'Find Discs in Seconds',
    description: 'No more searching in bushes. Your phone buzzes the moment someone scans your disc.',
    feature: 'Immediate Notification'
  },
  {
    icon: Zap,
    title: 'Lightweight Tracking',
    description: 'Under 3g per sticker. Zero impact on disc flight characteristics or performance.',
    feature: 'Pro-Approved'
  },
  {
    icon: Shield,
    title: 'Waterproof & Durable',
    description: 'Built for all weather conditions. Rain, mud, snow - your tracker keeps working.',
    feature: 'All-Weather'
  },
  {
    icon: Clock,
    title: '5+ Year Battery Life',
    description: 'Set it and forget it. Your discs stay trackable for years without maintenance.',
    feature: 'Long-Lasting'
  },
];

export function BenefitsSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-20 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-cyber font-bold">
            <span className="secondary-neon">GAME-CHANGING</span>
            <br />
            <span className="neon-text">BENEFITS</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Transform your disc golf experience with technology that actually works
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="card-cyber rounded-lg p-8 space-y-6 group relative overflow-hidden"
            >
              {/* Background glow effect */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-all duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  
                  <span className="text-xs font-cyber font-semibold text-secondary/70 uppercase tracking-wider bg-secondary/10 px-3 py-1 rounded-full">
                    {benefit.feature}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                
                <p className="text-foreground/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compatibility section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 text-center space-y-6"
        >
          <div className="inline-flex items-center space-x-4 bg-primary/10 rounded-full px-8 py-4 border border-primary/20">
            <Smartphone className="h-6 w-6 text-primary" />
            <span className="font-cyber font-semibold text-primary">
              Compatible with iPhone 7+ & Android 4.0+
            </span>
          </div>
          
          <p className="text-sm text-foreground/60 max-w-2xl mx-auto">
            Works with virtually every modern smartphone. No special apps needed - just tap and connect.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
