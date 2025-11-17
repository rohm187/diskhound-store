
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  features: string[];
  category: string;
  isPopular?: boolean;
  isGlow?: boolean;
  quantity: number;
  weight?: string | null;
  compatibility?: string | null;
  batteryLife?: string | null;
  waterproof?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Customer {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id?: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  shippingAddress: Address;
  billingAddress?: Address;
  stripePaymentId?: string;
  createdAt?: Date;
}

export interface CheckoutForm {
  customer: Customer;
  shippingAddress: Address;
  billingAddress?: Address;
  sameAsShipping: boolean;
}
