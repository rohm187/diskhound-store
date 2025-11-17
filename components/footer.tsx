
import Link from 'next/link';
import { Zap, Shield, Smartphone, Battery } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/50 border-t border-primary/20 mt-20">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Zap className="h-6 w-6 text-primary" />
              <span className="font-cyber text-lg font-bold neon-text">DiskHound</span>
            </div>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Never lose a disk again. Advanced NFC tracking technology for the modern disc golfer.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-cyber text-sm font-semibold text-primary uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link href="/products" className="block text-foreground/60 hover:text-primary transition-colors text-sm">
                Products
              </Link>
              <Link href="/faq" className="block text-foreground/60 hover:text-primary transition-colors text-sm">
                FAQ
              </Link>
              <Link href="/support" className="block text-foreground/60 hover:text-primary transition-colors text-sm">
                Support
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-cyber text-sm font-semibold text-primary uppercase tracking-wider">
              Features
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-foreground/60">
                <Shield className="h-4 w-4 text-primary" />
                <span>Waterproof</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-foreground/60">
                <Smartphone className="h-4 w-4 text-primary" />
                <span>iPhone 7+ & Android 4.0+</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-foreground/60">
                <Battery className="h-4 w-4 text-primary" />
                <span>5+ Year Battery Life</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-cyber text-sm font-semibold text-primary uppercase tracking-wider">
              Contact
            </h3>
            <div className="space-y-2 text-sm text-foreground/60">
              <p>Email: support@diskhound.com</p>
              <p>Hours: Mon-Fri 9AM-6PM PST</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary/20 text-center">
          <p className="text-foreground/40 text-sm">
            © {currentYear} DiskHound. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
