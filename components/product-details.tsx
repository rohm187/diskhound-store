
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product-card';
import { 
  ShoppingCart, 
  Check, 
  Shield, 
  Smartphone, 
  Battery, 
  Zap,
  Package,
  Clock,
  Star
} from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { toast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';

interface ProductDetailsProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const specs = [
    { icon: Shield, label: 'Waterproof', value: product.waterproof ? 'Yes' : 'No' },
    { icon: Package, label: 'Quantity', value: `${product.quantity} stickers` },
    { icon: Zap, label: 'Weight', value: product.weight || '< 3g per sticker' },
    { icon: Smartphone, label: 'Compatibility', value: product.compatibility || 'iPhone 7+ & Android 4.0+' },
    { icon: Battery, label: 'Battery Life', value: product.batteryLife || '5+ years' },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative aspect-square bg-muted/20 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {discountPercent > 0 && (
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-accent/20 text-accent border-accent/30 font-cyber">
                  -{discountPercent}% OFF
                </Badge>
              </div>
            )}
          </div>
          
          {/* Additional images could go here */}
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            {product.isPopular && (
              <Badge className="bg-secondary/20 text-secondary border-secondary/30 font-cyber">
                Most Popular Choice
              </Badge>
            )}
            
            <h1 className="text-3xl md:text-4xl font-cyber font-bold neon-text">
              {product.name}
            </h1>
            
            <div className="flex items-baseline space-x-4">
              <span className="text-4xl font-cyber font-bold secondary-neon">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-2xl text-foreground/60 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {discountPercent > 0 && (
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  Save ${(product.originalPrice! - product.price).toFixed(2)}
                </Badge>
              )}
            </div>
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed">
            {product.description}
          </p>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Key Features:</h3>
            <div className="grid grid-cols-1 gap-3">
              {product.features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-foreground font-medium">Quantity:</span>
            <div className="flex items-center border border-primary/30 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-primary/30 text-foreground font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            size="lg"
            className="w-full btn-cyber text-lg py-6"
          >
            <ShoppingCart className="mr-3 h-5 w-5" />
            Add {quantity > 1 ? `${quantity} ` : ''}to Cart - ${(product.price * quantity).toFixed(2)}
          </Button>

          {/* Trust indicators */}
          <div className="flex items-center justify-center space-x-8 pt-6 border-t border-primary/20">
            <div className="flex items-center space-x-2 text-sm text-foreground/70">
              <Shield className="h-4 w-4 text-primary" />
              <span>30-day guarantee</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-foreground/70">
              <Package className="h-4 w-4 text-primary" />
              <span>Free shipping</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-foreground/70">
              <Clock className="h-4 w-4 text-primary" />
              <span>Fast delivery</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Specs */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-20"
      >
        <h2 className="text-2xl font-cyber font-bold neon-text mb-8 text-center">
          Technical Specifications
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((spec, index) => (
            <div key={spec.label} className="card-cyber rounded-lg p-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <spec.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">{spec.label}</div>
                <div className="text-foreground/70">{spec.value}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Related Products */}
      {relatedProducts?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-cyber font-bold neon-text mb-8 text-center">
            You Might Also Like
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={{
                  id: relatedProduct.id,
                  name: relatedProduct.name,
                  price: relatedProduct.price,
                  originalPrice: relatedProduct.originalPrice || undefined,
                  image: relatedProduct.image,
                  badge: relatedProduct.isPopular ? 'Most Popular' : relatedProduct.isGlow ? 'Glow Edition' : undefined,
                  isPopular: relatedProduct.isPopular,
                  features: relatedProduct.features
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
