import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';

export const getSingleProductBySlug = async (slug: string) => {
  const SINGLE_PRODUCT_BY_SLUG_QUERY = defineQuery(`
    *[_type == "product" && slug.current == $slug] | order(name asc)[0]
  `);

  try {
    const singleProduct = await sanityFetch({
      query: SINGLE_PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });

    return singleProduct.data || null;
  } catch (error) {
    console.error('Error fetching single product by slug:', error);
    return null;
  }
};
