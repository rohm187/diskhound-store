
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem, Cart } from './types';

interface CartStore extends Cart {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (product: Product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find((item) => item.product.id === product.id);

        if (existingItem) {
          set((state) => ({
            items: state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            ...calculateTotals(
              state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            ),
          }));
        } else {
          const newItems = [...items, { product, quantity }];
          set({
            items: newItems,
            ...calculateTotals(newItems),
          });
        }
      },

      removeItem: (productId: string) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.product.id !== productId);
          return {
            items: newItems,
            ...calculateTotals(newItems),
          };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const newItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          );
          return {
            items: newItems,
            ...calculateTotals(newItems),
          };
        });
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
      },

      getItemQuantity: (productId: string) => {
        const item = get().items.find((item) => item.product.id === productId);
        return item?.quantity ?? 0;
      },
    }),
    {
      name: 'dischound-cart',
    }
  )
);

function calculateTotals(items: CartItem[]) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  return { total, itemCount };
}
