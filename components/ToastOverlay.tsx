'use client';

import { toast } from 'react-hot-toast';
import useCartStore from '@/store/store';
import type { Product } from '@/sanity.types';

const ToastOverlay = ({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) => {
  const { getItemCount } = useCartStore();
  const itemCount = getItemCount(product?._id);

  const showToast = () => {
    if (itemCount === 1) {
      toast.success('Product added to cart!');
    } else if (itemCount > 1) {
      toast.success('Products added to cart!');
    } else {
      toast.error('Please add at least one item to the cart.');
    }
  };

  return <div onClick={showToast}>{children}</div>;
};

export default ToastOverlay;
