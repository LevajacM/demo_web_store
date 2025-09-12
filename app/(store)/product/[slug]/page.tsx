import { getSingleProductBySlug } from '@/sanity/lib/products/getSingleProductBySlug';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import { PortableText } from 'next-sanity';
import { Button } from '@/components/ui/button';
import AddToCartButton from '@/components/AddToCartButton';

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const singleProduct = await getSingleProductBySlug(slug);
  const { image, name, description, price } = singleProduct || {};

  if (!singleProduct) notFound();

  const isOutOfStock =
    singleProduct?.stock !== null &&
    singleProduct?.stock !== undefined &&
    singleProduct?.stock <= 0;

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? 'opacity-35' : ''}`}
        >
          {image && (
            <Image
              src={imageUrl(image).url()}
              alt={name || 'Product photo'}
              fill
              className='object-cover transition-transform duration-300 ease-in-out hover:scale-105'
              // sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw '
            />
          )}
          {isOutOfStock && (
            <div className='absolute inset-0 flex items-center justify-center bg-black opacity-35'>
              <span className='text-white font-bold text-lg'>Out of Stock</span>
            </div>
          )}
        </div>

        <div className='flex flex-col justify-between'>
          <div>
            <h1 className='text-3xl font-bold mb-4'>{name}</h1>
            <div className='text-2xl font-semibold mb-4 text-yellow-600'>
              ${price?.toFixed(2)}
            </div>
            <div className='prose max-w-none mb-6 custom-prose'>
              {Array.isArray(description) && (
                <PortableText value={description} />
              )}
            </div>
          </div>

          {/* ADD TO CART BUTTON */}
          <div className='flex items-center space-x-4 mt-6'>
            <AddToCartButton product={singleProduct} disabled={isOutOfStock} />
            <Button
              variant='default'
              className='bg-yellow-600 font-bold hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer hover:bg-yellow-500 '
            >
              Add to Basket
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
