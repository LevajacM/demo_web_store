import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/lib/live';

export const getAllCategories = async () => {
  const ALL_CATEGORIES_QUERY = defineQuery(
    `*[_type == "category"] | order(name asc)`
  );

  try {
    //use sanityFetch to send query
    const categories = await sanityFetch({
      query: ALL_CATEGORIES_QUERY,
    });

    //return category list or [] if none
    return categories.data || [];
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
};
