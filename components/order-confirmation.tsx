
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Package, Clock, Mail, ArrowRight } from 'lucide-react';

interface Order {
  id: string;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  status: string;
  createdAt: Date;
  shippingAddress: any;
  customer: {
    email: string;
    firstName: string;
    lastName: string;
  };
  orderItems: Array<{
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      image: string;
    };
  }>;
}

interface OrderConfirmationProps {
  order: Order;
}

export function OrderConfirmation({ order }: OrderConfirmationProps) {
  const statusConfig = {
    PENDING: { color: 'bg-yellow-500/20 text-yellow-400', label: 'Payment Pending' },
    PROCESSING: { color: 'bg-blue-500/20 text-blue-400', label: 'Processing' },
    SHIPPED: { color: 'bg-primary/20 text-primary', label: 'Shipped' },
    DELIVERED: { color: 'bg-green-500/20 text-green-400', label: 'Delivered' },
    CANCELLED: { color: 'bg-red-500/20 text-red-400', label: 'Cancelled' }
  };

  const currentStatus = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.PENDING;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-20">
      
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 mb-12"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 neon-glow">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-cyber font-bold neon-text">
            Order Confirmed!
          </h1>
          <p className="text-xl text-foreground/70">
            Thank you for your purchase, {order.customer.firstName}!
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-foreground/70">Order #</span>
            <span className="font-cyber font-bold text-primary">
              {order.id.slice(-8).toUpperCase()}
            </span>
          </div>
          <Badge className={`${currentStatus.color} font-cyber`}>
            {currentStatus.label}
          </Badge>
        </div>
      </motion.div>

      {/* Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-cyber rounded-lg p-6 space-y-6"
          >
            <h2 className="text-xl font-cyber font-bold neon-text flex items-center">
              <Package className="h-5 w-5 mr-3" />
              Order Items
            </h2>
            
            <div className="space-y-4">
              {order.orderItems?.map((item, index) => (
                <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-background/50 rounded-lg">
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
                    <h3 className="font-semibold text-foreground">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-foreground/60">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-cyber font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card-cyber rounded-lg p-6 space-y-6"
          >
            <h2 className="text-xl font-cyber font-bold neon-text flex items-center">
              <Clock className="h-5 w-5 mr-3" />
              What's Next?
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Confirmation Email Sent
                  </h3>
                  <p className="text-sm text-foreground/70">
                    We've sent a confirmation email to {order.customer.email} with your order details.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Package className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Processing Your Order
                  </h3>
                  <p className="text-sm text-foreground/70">
                    We'll prepare and ship your DiskHound trackers within 1-2 business days.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Track Your Package
                  </h3>
                  <p className="text-sm text-foreground/70">
                    You'll receive a tracking number via email once your order ships.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card-cyber rounded-lg p-6 space-y-4"
          >
            <h3 className="font-cyber font-bold neon-text">Order Summary</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/70">Subtotal</span>
                <span className="text-foreground">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Shipping</span>
                <span className="text-foreground">
                  {order.shipping === 0 ? (
                    <span className="text-primary font-medium">FREE</span>
                  ) : (
                    `$${order.shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Tax</span>
                <span className="text-foreground">${order.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-primary/20 pt-2 flex justify-between font-cyber font-bold">
                <span className="text-foreground">Total</span>
                <span className="secondary-neon">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <Link href="/products" className="block">
              <Button className="w-full btn-cyber">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Link href="/faq" className="block">
              <Button variant="outline" className="w-full border-primary/30 hover:border-primary">
                Setup Instructions
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
