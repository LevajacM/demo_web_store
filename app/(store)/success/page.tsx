'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import useCartStore from '@/store/store';

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const clearCart = useCartStore((state) => state.clearBasket);

  // Clear the cart when the success page is loaded
  useEffect(() => {
    if (orderNumber) {
      clearCart();
    }
  }, [orderNumber, clearCart]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <div className='p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4 bg-white'>
        <h1 className='text-2xl font-bold pb-12 text-center text-yellow-600'>
          Your transaction has been completed successfully!
        </h1>
        <div className='flex items-center justify-center mb-4'>
          <svg
            width='120'
            height='120'
            viewBox='0 0 120 120'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              cx='60'
              cy='60'
              r='55'
              stroke='#CA8A04'
              strokeWidth='10'
              fill='none'
            />
            <path
              d='M40 65L55 80L85 45'
              stroke='#CA8A04'
              strokeWidth='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>

        <div className='flex flex-col sm:flex-row gap-6 justify-center pt-8'>
          <Button
            asChild
            className='bg-yellow-600 hover:bg-yellow-500  transition-all duration-300 font-bold'
          >
            <Link href='/orders'>View order details</Link>
          </Button>
          <Button
            asChild
            variant='outline'
            className='font-bold border-yellow-600 text-yellow-600 hover:bg-yellow-500 hover:text-white hover:border-transparent transition-all duration-300'
          >
            <Link href='/'>Continue shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
