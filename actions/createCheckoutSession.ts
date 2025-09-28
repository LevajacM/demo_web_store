'use server';

import { CartItem } from '@/store/store';
import stripe from '@/lib/stripe';
import { imageUrl } from '@/lib/imageUrl';

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

    // da li kupac vec postoji u stripe-u
    const customer = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    // ako postoji, uzmi njegov ID
    let customerId: string | undefined;
    if (customer.data.length > 0) {
      customerId = customer.data[0].id;
    }

    // ----------------------------------------
    // const baseUrl =
    //   process.env.NODE_ENV === 'development'
    //     ? `https://${process.env.VERCEL_URL}`
    //     : `${process.env.NEXT_PUBLIC_BASE_URL}`;

    // const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

    // const cancelUrl = `${baseUrl}/cart`;
    // ----------------------------------------

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : 'always',
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: 'payment',
      allow_promotion_codes: true,

      success_url: `${(process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,

      cancel_url: `${(process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || process.env.NEXT_PUBLIC_BASE_URL}/cart`,

      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(item.product.price! * 100), // pretvaranje u cente
          product_data: {
            name: item.product.name || 'No name product',
            description: `Product ID: ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.image
              ? [imageUrl(item.product.image).url()]
              : undefined,
          },
        },

        quantity: item.quantity,
      })),
    });

    return session.url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}
