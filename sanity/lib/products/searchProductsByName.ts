import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/lib/live';

export const searchProductsByName = async (searchParam: string) => {
  const SEARCH_PRODUCTS_BY_NAME_QUERY = defineQuery(`
  *[_type == "product" && name match $searchParam]| order(name asc) 
`);

  try {
    // passing parameter WITH WILDCARD - * !!!
    const searchResults = await sanityFetch({
      query: SEARCH_PRODUCTS_BY_NAME_QUERY,
      params: {
        searchParam: `${searchParam}*`,
      },
    });

    return searchResults.data || [];
  } catch (error) {
    console.error('Error searching products by name:', error);
    return [];
  }
};
