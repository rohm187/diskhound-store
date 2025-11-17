
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

export function CartItems() {
  const { items, updateQuantity, removeItem } = useCartStore();

  return (
    <div className="space-y-6">
      {items?.map((item, index) => (
        <motion.div
          key={item.product.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="card-cyber rounded-lg p-6 flex items-center space-x-6"
        >
          {/* Product Image */}
          <div className="relative w-20 h-20 bg-muted/20 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item.product.image}
              alt={item.product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {item.product.name}
            </h3>
            
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-cyber font-bold neon-text">
                ${item.product.price}
              </span>
              {item.product.originalPrice && (
                <span className="text-sm text-foreground/60 line-through">
                  ${item.product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="h-8 w-8 p-0 border-primary/30 hover:border-primary"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <span className="w-8 text-center font-medium text-foreground">
              {item.quantity}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="h-8 w-8 p-0 border-primary/30 hover:border-primary"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Item Total */}
          <div className="text-right flex-shrink-0 min-w-[80px]">
            <div className="text-lg font-cyber font-bold secondary-neon">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
          </div>

          {/* Remove Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeItem(item.product.id)}
            className="h-8 w-8 p-0 border-red-500/30 hover:border-red-500 text-red-400 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
