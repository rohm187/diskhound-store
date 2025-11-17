
'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CheckoutForm } from '@/components/checkout-form';
import { OrderSummary } from '@/components/order-summary';
import { useCartStore } from '@/lib/cart-store';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CheckoutPage() {
  const { items, total } = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && (!items || items.length === 0)) {
      router.push('/cart');
    }
  }, [items, router, mounted]);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-background cyber-grid flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShoppingBag className="h-16 w-16 text-primary/50 mx-auto" />
          <h2 className="text-xl font-cyber font-bold neon-text">No items to checkout</h2>
          <Link href="/products">
            <Button className="btn-cyber">Start Shopping</Button>
          </Link>
        </div>
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
            Checkout
          </h1>
          <p className="text-foreground/70">
            Complete your order and get your disc trackers delivered fast
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CheckoutForm />
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <OrderSummary />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
