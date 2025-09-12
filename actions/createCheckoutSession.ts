'use server';

import { CartItem } from '@/store/store';

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedCartItem = {
  product: CartItem['product'];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedCartItem[],
  metadata: Metadata
) {
  try {
    // provera da li neki proizvod nema cenu
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error(`Some items are missing price`);
    }

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items, metadata }),
    });

    if (!response.ok) {
      console.error('Failed to create checkout session:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.url as string;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}
