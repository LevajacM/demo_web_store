import type { Product, Category } from '@/sanity.types';
import ProductsGrid from './ProductsGrid';
import CategorySelectorCombobox from './CategorySelectorCombobox';

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className='flex flex-col'>
      {/* CATEGORIES */}
      <div className='w-full sm:w-[200px]'>
        <CategorySelectorCombobox categories={categories} />
      </div>

      {/* PRODUCTS */}
      <div className='flex-1'>
        <ProductsGrid products={products} />

        <hr className='w-1/2 sm:w-3/4' />
      </div>
    </div>
  );
};

export default ProductsView;
