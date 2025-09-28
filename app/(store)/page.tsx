import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import ProductsView from '@/components/ProductsView';
import WeeklySaleBanner from '@/components/WeeklySaleBanner';
import MonthlySaleBanner from '@/components/MonthlySaleBanner';
import YearlySaleBanner from '@/components/YearlySaleBanner';
import BlackFridaySaleBanner from '@/components/BlackFridaySaleBanner';

export const dynamic = 'force-static';
export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div>
      <div>
        <WeeklySaleBanner />
        <MonthlySaleBanner />
        <YearlySaleBanner />
        <BlackFridaySaleBanner />
      </div>

      <div className='flex flex-col items-center justify-top min-h-screen bg-gray-50 p-4'>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
