
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useCartStore } from '@/lib/cart-store';
import { toast } from '@/hooks/use-toast';
import { CreditCard, User, MapPin, Shield } from 'lucide-react';
import type { CheckoutForm as CheckoutFormType } from '@/lib/types';

export function CheckoutForm() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormType>({
    customer: {
      email: '',
      firstName: '',
      lastName: '',
      phone: ''
    },
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US'
    },
    billingAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US'
    },
    sameAsShipping: true
  });

  const handleInputChange = (section: keyof CheckoutFormType, field: string, value: string) => {
    if (section === 'sameAsShipping') {
      setFormData(prev => ({ ...prev, sameAsShipping: value === 'true' }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }
  };

  const subtotal = total;
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = 0;
  const finalTotal = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create order
      const orderData = {
        customer: formData.customer,
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        total: finalTotal,
        subtotal,
        tax,
        shipping,
        shippingAddress: formData.shippingAddress,
        billingAddress: formData.sameAsShipping ? formData.shippingAddress : formData.billingAddress
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const { orderId } = await response.json();

      // Create Stripe payment session
      const stripeResponse = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount: finalTotal,
          customerEmail: formData.customer.email
        }),
      });

      if (!stripeResponse.ok) {
        throw new Error('Failed to create payment session');
      }

      const { clientSecret } = await stripeResponse.json();

      // For demo purposes, we'll simulate successful payment
      // In production, you'd integrate with Stripe Elements here
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and redirect
      clearCart();
      router.push(`/order-confirmation/${orderId}`);

      toast({
        title: "Order placed successfully!",
        description: "You'll receive a confirmation email shortly.",
      });

    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Customer Information */}
      <div className="card-cyber rounded-lg p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Customer Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              required
              value={formData.customer.firstName}
              onChange={(e) => handleInputChange('customer', 'firstName', e.target.value)}
              className="border-primary/30 focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              required
              value={formData.customer.lastName}
              onChange={(e) => handleInputChange('customer', 'lastName', e.target.value)}
              className="border-primary/30 focus:border-primary"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.customer.email}
            onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
            className="border-primary/30 focus:border-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.customer.phone || ''}
            onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
            className="border-primary/30 focus:border-primary"
          />
        </div>
      </div>

      {/* Shipping Address */}
      <div className="card-cyber rounded-lg p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Shipping Address</h2>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              required
              value={formData.shippingAddress.street}
              onChange={(e) => handleInputChange('shippingAddress', 'street', e.target.value)}
              className="border-primary/30 focus:border-primary"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                required
                value={formData.shippingAddress.city}
                onChange={(e) => handleInputChange('shippingAddress', 'city', e.target.value)}
                className="border-primary/30 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                required
                value={formData.shippingAddress.state}
                onChange={(e) => handleInputChange('shippingAddress', 'state', e.target.value)}
                className="border-primary/30 focus:border-primary"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="postalCode">ZIP Code</Label>
            <Input
              id="postalCode"
              required
              value={formData.shippingAddress.postalCode}
              onChange={(e) => handleInputChange('shippingAddress', 'postalCode', e.target.value)}
              className="border-primary/30 focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="card-cyber rounded-lg p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Payment Information</h2>
        </div>
        
        {/* Stripe Elements would go here in production */}
        <div className="bg-primary/5 border border-primary/30 rounded-lg p-4 text-center">
          <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-sm text-foreground/70 mb-2">
            Secure payment processing powered by Stripe
          </p>
          <p className="text-xs text-foreground/50">
            Demo mode - No real payments will be processed
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={isProcessing}
        className="w-full btn-cyber text-lg py-6 relative"
      >
        {isProcessing ? (
          <>
            <div className="loading-spinner mr-3" />
            Processing Order...
          </>
        ) : (
          <>
            <Shield className="mr-3 h-5 w-5" />
            Complete Order - ${finalTotal.toFixed(2)}
          </>
        )}
      </Button>

      {/* Trust Indicators */}
      <div className="text-center text-sm text-foreground/60 space-y-2">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-1">
            <Shield className="h-4 w-4 text-primary" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1">
            <CreditCard className="h-4 w-4 text-primary" />
            <span>30-Day Guarantee</span>
          </div>
        </div>
        <p>Your payment information is encrypted and secure.</p>
      </div>
    </form>
  );
}
