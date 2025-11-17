
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const featuredProducts = [
  {
    id: 'pack-3',
    name: '3-Pack Starter Kit',
    price: 9.99,
    originalPrice: 14.99,
    image: 'https://static.abacusaicdn.net/images/606de510-2d17-463a-99b0-d1fed5cf07e7.jpg',
    badge: 'Best for Beginners',
    features: ['3 waterproof stickers', 'iPhone & Android compatible', '5+ year battery']
  },
  {
    id: 'pack-10',
    name: '10-Pack Most Popular',
    price: 24.99,
    originalPrice: 39.99,
    image: 'https://static.abacusaicdn.net/images/bdffabb2-cbeb-4f06-84d2-d27968d336b5.jpg',
    badge: 'Most Popular',
    isPopular: true,
    features: ['10 waterproof stickers', 'Best value per sticker', 'Perfect for full bag']
  },
  {
    id: 'pro-bundle',
    name: 'Pro Bundle Ultimate',
    price: 149.99,
    originalPrice: 179.99,
    image: 'https://static.abacusaicdn.net/images/f862e5d3-845a-4bc6-b6da-036d91a6794f.jpg',
    badge: 'Pro Choice',
    features: ['50 premium stickers', 'IMU sensor included', 'Performance analytics']
  }
];

export function ProductShowcase() {
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
            <span className="neon-text">CHOOSE YOUR</span>
            <br />
            <span className="secondary-neon">TRACKING PACK</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            From beginner-friendly starter kits to professional tracking bundles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Link href="/products">
            <Button size="lg" className="btn-cyber text-lg px-8 py-4">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
