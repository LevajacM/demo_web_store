import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import ProductsView from '@/components/ProductsView';
import ActiveSaleBanner from '@/components/ActiveSaleBanner';

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div>
      <div>
        <ActiveSaleBanner />
      </div>
      <h1>Product Catalog qejbvwuebhviwuebhv</h1>
      <div className='mx-4'>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
