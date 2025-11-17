
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Smartphone } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://static.abacusaicdn.net/images/f862e5d3-845a-4bc6-b6da-036d91a6794f.jpg"
          alt="Disc Golf NFC Tracking Hero"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/90" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-cyber font-black leading-tight"
                data-text="NEVER LOSE A DISK AGAIN"
              >
                <span className="neon-text">NEVER LOSE</span>
                <br />
                <span className="secondary-neon">A DISK AGAIN</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl"
              >
                Stop wasting money replacing lost discs. Our NFC trackers give you instant phone alerts when someone finds your disc.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground/70">Waterproof</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground/70">iPhone 7+ & Android</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground/70">5+ Year Battery</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/products">
                <Button size="lg" className="btn-cyber text-lg px-8 py-6 w-full sm:w-auto pulse-neon">
                  Start Tracking Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <div className="flex flex-col justify-center">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-cyber font-bold neon-text">$9.99</span>
                  <span className="text-lg text-foreground/60 line-through">$14.99</span>
                </div>
                <span className="text-sm text-foreground/70">Starting price • Free shipping</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Product Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 neon-glow rounded-full opacity-50" />
              <Image
                src="https://static.abacusaicdn.net/images/606de510-2d17-463a-99b0-d1fed5cf07e7.jpg"
                alt="DiskHound NFC Sticker Close-up"
                fill
                className="object-contain relative z-10 drop-shadow-2xl"
              />
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-20, 0, -20] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 bg-primary/10 backdrop-blur-sm rounded-lg p-4 border border-primary/30"
              >
                <div className="text-center">
                  <div className="text-2xl font-cyber font-bold neon-text">5+</div>
                  <div className="text-xs text-foreground/70">Year Battery</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-10 bg-secondary/10 backdrop-blur-sm rounded-lg p-4 border border-secondary/30"
              >
                <div className="text-center">
                  <div className="text-2xl font-cyber font-bold secondary-neon">&lt; 3g</div>
                  <div className="text-xs text-foreground/70">Ultra Light</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
