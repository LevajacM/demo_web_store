'use client';

import {
  SignInButton,
  useUser,
  ClerkLoaded,
  UserButton,
  SignedIn,
} from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import Form from 'next/form';
import { Button } from './ui/button';
import { ShoppingCart, CalendarArrowDown } from 'lucide-react';
import useCartStore from '@/store/store';
import { get } from 'http';

const Header = () => {
  const { user } = useUser();
  const itemsCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  // console.log(user);

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (error) {
      console.error('Error:', JSON.stringify(error, null, 2));
    }
  };

  return (
    <header className='flex flex-wrap justify-between items-center px-4 py-2'>
      <div className='flex flex-wrap w-full justify-between items-center'>
        {/* LOGO LINK */}

        <Link
          href='/'
          className='text-2xl font-bold hover:opacity-50 transition-all duration-300 cursor-pointer mx-auto sm:mx-0'
        >
          <Image src='/logo.png' alt='Logo' width={50} height={50} />
        </Link>

        {/* SEARCH FORM */}

        <Form
          action='/search'
          className='w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0'
        >
          <input
            type='text'
            name='query'
            placeholder='Search for products...'
            className='bg-gray-50 text-gray-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-50 border w-full max-w-3xl'
          />
        </Form>
        <div className='flex items-center mx-auto space-x-4 mt-4 sm:mt-0 sm:flex-none'>
          {/* MY CART */}

          <Link href='/cart'>
            <Button
              variant='default'
              className='flex-1 justify-between py-2 px-4 items-center font-bold relative cursor-pointer hover:opacity-65 transition-all duration-300 hover:text-yellow-500'
            >
              <ShoppingCart />

              <span>My Cart</span>
              <span className='rounded-full bg-yellow-600 h-5 w-5 absolute -top-2 -right-2 items-center justify-center flex text-xs text-white'>
                {itemsCount}
              </span>
            </Button>
          </Link>

          {/* IF USER */}

          <ClerkLoaded>
            {/* my orders */}
            <SignedIn>
              <Link href='/orders'>
                <Button
                  variant='default'
                  className='flex justify-between py-2 px-4 items-center font-bold relative cursor-pointer hover:opacity-45 transition-all duration-300 hover:text-yellow-500'
                >
                  <span>
                    <CalendarArrowDown />
                  </span>
                  My Orders
                </Button>
              </Link>
            </SignedIn>

            {/* PASSKEY */}
            {user?.passkeys.length === 0 && (
              <Button
                variant='ghost'
                onClick={createClerkPasskey}
                className='py-2 px-4  font-bold  cursor-pointer hover:opacity-45 transition-all duration-300 hover:text-gray-500 border-2 border-black hover:border-gray-500'
              >
                Create Passkey
              </Button>
            )}

            {user ? (
              <div className='flex items-center space-x-4'>
                <UserButton />

                <div className='hidden sm:block text-xs'>
                  <p className='text-gray-400'>Welcome Back</p>
                  <p className='text-gray-500 font-bold'>{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode='modal'>
                <Button
                  variant='default'
                  className='py-2 px-4  font-bold  cursor-pointer hover:opacity-45 transition-all duration-300 hover:text-yellow-500'
                >
                  Sign In
                </Button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
