
'use client';

import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product-card';
import { useCartStore } from '@/lib/cart-store';

const upsellProducts = [
  {
    id: 'pack-10',
    name: '10-Pack Most Popular',
    price: 24.99,
    originalPrice: 39.99,
    image: 'https://static.abacusaicdn.net/images/bdffabb2-cbeb-4f06-84d2-d27968d336b5.jpg',
    badge: 'Upgrade & Save',
    features: ['10 waterproof stickers', 'Best value per sticker', 'Perfect for full bag']
  },
  {
    id: 'pro-bundle',
    name: 'Pro Bundle Ultimate',
    price: 149.99,
    originalPrice: 179.99,
    image: 'https://static.abacusaicdn.net/images/f862e5d3-845a-4bc6-b6da-036d91a6794f.jpg',
    badge: 'Complete Setup',
    features: ['50 premium stickers', 'IMU sensor included', 'Performance analytics']
  }
];

export function UpsellSection() {
  const { items } = useCartStore();
  
  // Don't show upsells if cart already has these items
  const cartProductIds = items?.map(item => item.product.id) ?? [];
  const availableUpsells = upsellProducts.filter(product => !cartProductIds.includes(product.id));

  if (!availableUpsells?.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-cyber font-bold neon-text">
          Complete Your Setup
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Get even more value with these popular upgrades
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {availableUpsells.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
