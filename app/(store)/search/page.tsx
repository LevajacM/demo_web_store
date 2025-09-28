import ProductsGrid from '@/components/ProductsGrid';
import { searchProductsByName } from '@/sanity/lib/products/searchProductsByName';

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;
  const products = await searchProductsByName(query);

  if (products.length === 0) {
    return (
      <div className='flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4'>
        <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-4xl'>
          <h1 className='text-3xl font-bold mb-6 text-center'>
            No products found for{' '}
            <span className='font-bold text-yellow-400 italic capitalize'>
              {query}
            </span>
          </h1>
          <p className='text-gray-600 text-center'>
            Try searching for something else
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4'>
      <h1 className='text-3xl font-bold nb-6 text-center'>
        {query !== '' ? 'Search results for' : ''}{' '}
        <span className='font-bold text-yellow-400 italic capitalize'>
          {query !== '' ? query : 'all products'}
        </span>
      </h1>

      <ProductsGrid products={products} />
    </div>
  );
};

export default SearchPage;
