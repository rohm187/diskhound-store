
'use client';

import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product-card';
import type { Product } from '@/lib/types';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/60">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <ProductCard 
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice || undefined,
              image: product.image,
              badge: product.isPopular ? 'Most Popular' : product.isGlow ? 'Glow Edition' : undefined,
              isPopular: product.isPopular,
              features: product.features
            }} 
          />
        </motion.div>
      ))}
    </div>
  );
}
