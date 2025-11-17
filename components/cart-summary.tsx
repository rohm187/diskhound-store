
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import { ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';

export function CartSummary() {
  const { items, total } = useCartStore();
  
  const subtotal = total;
  const tax = 0; // Tax calculation can be added here
  const shipping = subtotal >= 50 ? 0 : 9.99; // Free shipping over $50
  const finalTotal = subtotal + tax + shipping;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="card-cyber rounded-lg p-6 space-y-6 sticky top-20"
    >
      <h2 className="text-xl font-cyber font-bold neon-text">
        Order Summary
      </h2>

      {/* Line Items */}
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
        
        <div className="border-t border-primary/20 pt-3">
          <div className="flex justify-between text-lg font-cyber font-bold">
            <span className="text-foreground">Total</span>
            <span className="secondary-neon">${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Free Shipping Progress */}
      {shipping > 0 && (
        <div className="space-y-2">
          <div className="text-sm text-foreground/70">
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

      {/* Checkout Button */}
      <Link href="/checkout">
        <Button size="lg" className="w-full btn-cyber text-lg py-6">
          Proceed to Checkout
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>

      {/* Trust Indicators */}
      <div className="space-y-3 pt-4 border-t border-primary/20">
        <div className="flex items-center space-x-3 text-sm text-foreground/70">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span>30-day money-back guarantee</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-foreground/70">
          <Truck className="h-4 w-4 text-primary" />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-foreground/70">
          <Clock className="h-4 w-4 text-primary" />
          <span>Fast 2-3 day delivery</span>
        </div>
      </div>
    </motion.div>
  );
}
