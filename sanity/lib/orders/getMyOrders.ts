import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/lib/live';

export async function getMyOrders(userId: string) {
  if (!userId) {
    throw new Error('User ID is required to fetch orders');
  }

  const MY_ORDERS_QUERY = defineQuery(`
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc){
      ..., products[]{
        ..., product->
      }
    }
    `);

  // use sanityFetch to send the query
  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });

    // return the list of orders or empty array
    return orders.data || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Error fetching orders');
  }
}
