
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Users, Shield, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Disc Golfers Protected',
    description: 'Players using DiskHound'
  },
  {
    icon: Shield,
    value: '50,000+',
    label: 'Discs Tracked',
    description: 'Safe from loss'
  },
  {
    icon: TrendingUp,
    value: '95%',
    label: 'Recovery Rate',
    description: 'Successful disc returns'
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Customer Rating',
    description: 'Average review score'
  }
];

const testimonials = [
  {
    name: 'Jake M.',
    rating: 5,
    text: "Lost three discs in one round before DiskHound. Now I get them back every time someone finds them!",
    location: 'Portland, OR'
  },
  {
    name: 'Sarah K.',
    rating: 5,
    text: "Game changer! No more carrying backup discs or worrying about expensive throws in rough terrain.",
    location: 'Austin, TX'
  },
  {
    name: 'Mike R.',
    rating: 5,
    text: "Super lightweight, waterproof, and actually works. Got my first disc back within hours!",
    location: 'Denver, CO'
  }
];

export function SocialProofSection() {
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
            <span className="secondary-neon">TRUSTED BY</span>
            <br />
            <span className="neon-text">DISC GOLFERS</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Join thousands of players who never lose discs anymore
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="text-center space-y-3"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
                className="text-3xl md:text-4xl font-cyber font-bold neon-text counter"
              >
                {stat.value}
              </motion.div>
              
              <div className="space-y-1">
                <div className="text-lg font-semibold text-foreground">
                  {stat.label}
                </div>
                <div className="text-sm text-foreground/60">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
              className="card-cyber rounded-lg p-6 space-y-4 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-xl" />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-foreground/80 leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t border-primary/20 pt-4">
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-foreground/60">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
