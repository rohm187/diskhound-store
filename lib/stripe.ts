
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-10-29.clover',
});

export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100); // Convert dollars to cents
};

export const formatAmountFromStripe = (amount: number): number => {
  return amount / 100; // Convert cents to dollars
};
