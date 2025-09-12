import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/lib/live';

export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(
    `*[_type == "product"] | order(name asc)`
  );

  try {
    //use sanityFetch to send query
    const products = await sanityFetch({
      query: ALL_PRODUCTS_QUERY,
    });

    //return product list or [] if none
    return products.data || [];
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};
