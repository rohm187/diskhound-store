
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCartStore } from '@/lib/cart-store';
import { Separator } from '@/components/ui/separator';

export function OrderSummary() {
  const { items, total } = useCartStore();
  
  const subtotal = total;
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = 0;
  const finalTotal = subtotal + shipping + tax;

  return (
    <div className="card-cyber rounded-lg p-6 space-y-6 sticky top-20">
      <h2 className="text-xl font-cyber font-bold neon-text">
        Order Summary
      </h2>

      {/* Items */}
      <div className="space-y-4">
        {items?.map((item) => (
          <motion.div
            key={item.product.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <div className="relative w-16 h-16 bg-muted/20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover"
              />
              <div className="absolute -top-2 -right-2 bg-secondary text-background text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {item.quantity}
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-foreground text-sm">
                {item.product.name}
              </h3>
              <p className="text-sm text-foreground/60">
                ${item.product.price} each
              </p>
            </div>
            
            <div className="text-right">
              <div className="font-cyber font-bold text-primary">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Separator className="bg-primary/20" />

      {/* Totals */}
      <div className="space-y-3">
        <div className="flex justify-between text-foreground">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-foreground">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-primary font-medium">FREE</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-foreground">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <Separator className="bg-primary/20" />
        
        <div className="flex justify-between text-lg font-cyber font-bold">
          <span className="text-foreground">Total</span>
          <span className="secondary-neon">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Free Shipping Progress */}
      {shipping > 0 && (
        <div className="space-y-2 pt-4 border-t border-primary/20">
          <div className="text-sm text-foreground/70 text-center">
            Add ${(50 - subtotal).toFixed(2)} more for free shipping!
          </div>
          <div className="w-full bg-muted/20 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
