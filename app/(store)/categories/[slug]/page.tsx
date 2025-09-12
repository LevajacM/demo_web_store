import { getProductsByCategory } from '@/sanity/lib/products/getProductsByCategory';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import ProductsView from '@/components/ProductsView';

const CategoriesPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const productsRaw = await getProductsByCategory(slug);
  const products = productsRaw ?? [];
  const categories = await getAllCategories();

  // console.log(products);

  return (
    <div className='flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-7xl'>
        <h1 className='text-3xl font-bold mb-6 text-center'>
          {slug
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')}{' '}
          Collection
        </h1>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
