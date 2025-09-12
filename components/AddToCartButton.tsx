'use client';

import { useState, useEffect } from 'react';
import useCartStore from '@/store/store';
import type { Product } from '@/sanity.types';

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
}

const AddToCartButton = ({ product, disabled }: AddToCartButtonProps) => {
  const { addItem, removeItem, getItemCount } = useCartStore();
  const itemCount = getItemCount(product?._id);
  const [isClient, setIsClient] = useState(false);

  // Ensure the component only renders on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className='flex items-center space-x-2 justify-center'>
      <button
        onClick={() => removeItem(product._id)}
        disabled={itemCount === 0 || disabled}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${itemCount === 0 ? 'bg-yellow-400  cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-500 text-white cursor-pointer'}`}
      >
        <span className='text-2xl font-bold text-white'>-</span>
      </button>
      <span className='w-8 text-center font-semibold'>{itemCount}</span>
      <button
        onClick={() => addItem(product)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-yellow-600 hover:bg-yellow-400 text-white cursor-pointer `}
      >
        <span className={'text-xl font-bold text-white'}>+</span>
      </button>
    </div>
  );
};

export default AddToCartButton;
