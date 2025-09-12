'use client';

import { useState, useEffect } from 'react';
import { SignInButton, useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/store';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';
import { imageUrl } from '@/lib/imageUrl';
import { LoaderTwo } from '@/components/ui/loader';
import type { Metadata } from '@/actions/createCheckoutSession';
import { createCheckoutSession } from '@/actions/createCheckoutSession';

const CartPage = () => {
  const groupedItems = useCartStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle checkout
  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? 'Unknown',
        customerEmail: user?.emailAddresses[0].emailAddress ?? 'Unknown',
        clerkUserId: user?.id ?? 'Unknown',
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        alert('Failed to create checkout session. Please try again.');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Ensure the component only renders on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className='h-full'>
        <div className='grid place-items-center h-screen w-full'>
          <LoaderTwo />
        </div>
      </div>
    );
  }

  // if cart is empty
  if (groupedItems.length === 0) {
    return (
      <div className='container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]'>
        <h1 className='text-2xl lg:text-3xl font-bold mb-6 text-yellow-600'>
          Your Cart
        </h1>
        <p className='text-gray-600 text-lg lg:text-xl mb-6'>
          Your cart is empty
        </p>
        <div className='relative h-20 w-20 lg:w-32 lg:h-32 border-3 lg:border-4 border-yellow-600 rounded-full grid items-center justify-items-center'>
          <ShoppingCart className='h-10 w-10 lg:w-12 lg:h-12 text-yellow-600' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-[140%] h-0 border-t-3 lg:border-t-4 border-yellow-600 -rotate-45'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4 max-w-6xl'>
      <h1 className='text-2xl lg:text-3xl font-bold mb-6 text-yellow-600 text-center'>
        Your Cart
      </h1>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='flex-grow'>
          {groupedItems.map((item) => (
            <div
              key={item.product._id}
              className='mb-4 p-4 border border-yellow-600 rounded-lg flex justify-between items-center'
            >
              <div
                className='flex items-center cursor-pointer flex-1 min-w-0'
                onClick={() =>
                  router.push(`/product/${item.product.slug?.current}`)
                }
              >
                <div className='w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4'>
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? 'Product Image'}
                      className='w-full h-full object-cover rounded'
                      width={96}
                      height={96}
                    />
                  )}
                </div>
                <div className='min-w-0'>
                  <h2 className='text-lg sm:text-xl font-semibold text-gray-800 truncate'>
                    {item.product.name}
                  </h2>
                  <p className='text-sm sm:text-base text-gray-500 '>
                    ${((item.product.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div>
                <AddToCartButton product={item.product} />
              </div>
            </div>
          ))}
        </div>

        <div className='w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border border-yellow-600 lg:rounded-lg lg:order-last fixed bottom-0 left-0 lg:left-auto'>
          <h3 className='text-xl font-semibold text-yellow-600'>
            Order Summary
          </h3>
          <div className='mt-4 space-y-2'>
            <p className='flex justify-between'>
              <span>Items:</span>
              <span>
                {groupedItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </p>
            <p className='flex justify-between text-2xl font-bold border-t-2 border-yellow-600 pt-2'>
              <span>Total:</span>
              <span>${useCartStore.getState().getTotalPrice().toFixed(2)}</span>
            </p>
          </div>
          {/* checkout button or singin */}
          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className='mt-4 w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-500 disabled:bg-gray-400 font-bold'
            >
              {isLoading ? 'Processing...' : 'Checkout'}
            </button>
          ) : (
            <SignInButton mode='modal'>
              <button className='mt-4 w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:yellow-500 font-bold'>
                Sign in to checkout
              </button>
            </SignInButton>
          )}
        </div>

        {/* Spacer for mobile */}
        <div className='h-64 lg:h-0'></div>
      </div>
    </div>
  );
};

export default CartPage;
