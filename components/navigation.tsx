
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCartStore();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10">
              <Image
                src="https://static.abacusaicdn.net/images/02548909-d11b-4782-b0d7-beb9e514429b.jpg"
                alt="DiskHound Logo"
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="font-cyber text-xl font-bold neon-text">
              DiskHound
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="outline" size="sm" className="relative btn-cyber border-primary/50 hover:border-primary">
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-secondary text-background text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="sm" className="btn-cyber">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-md border-l border-primary/20">
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="flex items-center space-x-3 pb-4 border-b border-primary/20">
                    <Zap className="h-6 w-6 text-primary" />
                    <span className="font-cyber text-lg font-bold neon-text">DiskHound</span>
                  </div>
                  
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors duration-300 py-2"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="pt-4 border-t border-primary/20">
                    <Link href="/cart" onClick={() => setIsOpen(false)}>
                      <Button className="w-full btn-cyber">
                        View Cart ({itemCount})
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
