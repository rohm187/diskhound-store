
'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CartItems } from '@/components/cart-items';
import { CartSummary } from '@/components/cart-summary';
import { UpsellSection } from '@/components/upsell-section';
import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { items, itemCount } = useCartStore();

  if (!items?.length) {
    return (
      <div className="min-h-screen bg-background cyber-grid">
        <Navigation />
        
        <main className="container mx-auto max-w-6xl px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <ShoppingBag className="h-24 w-24 text-primary/50 mx-auto" />
              <h1 className="text-3xl font-cyber font-bold neon-text">
                Your Cart is Empty
              </h1>
              <p className="text-foreground/70 max-w-md mx-auto">
                Looks like you haven't added any disc trackers yet. Start building your collection!
              </p>
            </div>
            
            <Link href="/products">
              <Button size="lg" className="btn-cyber">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <Navigation />
      
      <main className="container mx-auto max-w-6xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-cyber font-bold neon-text mb-4">
            Shopping Cart
          </h1>
          <p className="text-foreground/70">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <CartItems />
          </div>

          {/* Cart Summary */}
          <div className="space-y-8">
            <CartSummary />
          </div>
        </div>

        {/* Upsells */}
        <div className="mt-16">
          <UpsellSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
