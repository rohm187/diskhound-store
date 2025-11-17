
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { DollarSign, Package, Clock, AlertTriangle } from 'lucide-react';

const painPoints = [
  {
    icon: DollarSign,
    title: 'Lost Discs Cost $15-20 Each',
    description: 'Premium discs are expensive to replace. One lost disc can ruin your round and your budget.',
    stat: '$15-20',
    statLabel: 'per lost disc'
  },
  {
    icon: Package,
    title: 'Heavy Bags From Backup Discs',
    description: 'Carrying extra discs "just in case" adds unnecessary weight and bulk to your disc golf bag.',
    stat: '10+lbs',
    statLabel: 'extra weight'
  },
  {
    icon: Clock,
    title: 'Wasted Time Searching',
    description: 'Searching for lost discs disrupts your flow, slows down your group, and ruins the experience.',
    stat: '15min',
    statLabel: 'average search time'
  },
  {
    icon: AlertTriangle,
    title: 'Game Disruption & Frustration',
    description: 'Lost discs create stress, slow down pace of play, and can turn a great round into a frustrating experience.',
    stat: '73%',
    statLabel: 'of players affected'
  },
];

export function PainPointsSection() {
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
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-cyber font-bold">
            <span className="neon-text">TIRED OF LOSING</span>
            <br />
            <span className="secondary-neon">EXPENSIVE DISCS?</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Every disc golfer knows the frustration. Here's what lost discs really cost you:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="card-cyber rounded-lg p-6 text-center space-y-4 group hover:scale-105 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                <point.icon className="h-8 w-8 text-primary" />
              </div>
              
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="text-2xl font-cyber font-bold neon-text">
                    {point.stat}
                  </div>
                  <div className="text-xs text-foreground/60 uppercase tracking-wider">
                    {point.statLabel}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground">
                  {point.title}
                </h3>
                
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
