
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    badge?: string;
    isPopular?: boolean;
    features?: string[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create a minimal product object for cart
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      description: '',
      features: product.features || [],
      category: '',
      quantity: 1,
      waterproof: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addItem(cartProduct);
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="card-cyber rounded-lg overflow-hidden relative group"
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-20">
          <Badge 
            variant={product.isPopular ? "default" : "secondary"}
            className={`font-cyber text-xs px-3 py-1 ${
              product.isPopular 
                ? 'bg-secondary text-background neon-glow' 
                : 'bg-primary/20 text-primary border-primary/30'
            }`}
          >
            {product.badge}
          </Badge>
        </div>
      )}

      {/* Discount badge */}
      {discountPercent > 0 && (
        <div className="absolute top-4 right-4 z-20">
          <Badge className="bg-accent/20 text-accent border-accent/30 font-cyber text-xs">
            -{discountPercent}%
          </Badge>
        </div>
      )}

      <Link href={`/products/${product.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-square bg-muted/20">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
            
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-cyber font-bold neon-text">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-foreground/60 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Features */}
          {product.features && (
            <div className="space-y-2">
              {product.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-foreground/70">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full btn-cyber mt-4 group/btn"
          >
            <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
            Add to Cart
          </Button>
        </div>
      </Link>
    </motion.div>
  );
}
