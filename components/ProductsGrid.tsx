'use client';

import type { Product } from '@/sanity.types';
import ProductThumbnail from './ProductThumbnail';
import { AnimatePresence, motion } from 'motion/react';

const ProductsGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
      <AnimatePresence mode='popLayout'>
        {products.map((product) => {
          return (
            <motion.div
              key={product._id}
              layout
              initial={{ opacity: 0.2, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className='flex justify-center'
            >
              <ProductThumbnail key={product._id} product={product} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ProductsGrid;
