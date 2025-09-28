import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getMyOrders } from '@/sanity/lib/orders/getMyOrders';
import { formatCurrency } from '@/lib/formatCurrency';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';

const OrdersPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const orders = await getMyOrders(userId);

  return (
    <div className='flex flex-col items-center justify-start min-h-screen bg-gray-50 px-4 py-12'>
      <div className='bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl'>
        <h1 className='text-4xl font-bold text-yellow-600 tracking-tight mb-8'>
          OrdersPage
        </h1>

        {orders.length < 1 ? (
          <div className='text-center text-yellow-600'>
            <p>You don&apos;t have any orders yet</p>
          </div>
        ) : (
          <div className='space-y-6 sm:space-y-8'>
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className='bg-white border border-yellow-200 rounded-lg shadow-md overflow-hidden'
              >
                <div className='pl-4 pr-4 pt-4 sm:pl-6 sm:pr-6 sm:pt-6'>
                  <div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4 border-b border-yellow-200 pb-8'>
                    <div>
                      <p className='text-sm text-gray-600 mb-1 font-bold'>
                        Order number
                      </p>
                      <p className='font-mono text-sm text-yellow-600'>
                        {order.orderNumber}
                      </p>
                    </div>
                    <div className='sm:text-right'>
                      <p className='text-sm text-gray-600 mb-1 font-bold'>
                        Order date
                      </p>
                      <p className='font-medium text-yellow-600'>
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString()
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center pl-4 pr-4 pb-1 sm:pl-6 sm:pr-6 '>
                  <div className='flex items-center'>
                    <span className='text-sm mr-2'>Status:</span>
                    <span
                      className={`px-3 py-1 rounded-md text-sm capitalize ${order.status === 'paid' ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className='sm:text-right'>
                    <p className='text-sm text-gray-600 mb-1'>Total amount</p>
                    <p className='font-bold text-lg'>
                      {formatCurrency(order.totalPrice ?? 0, order.currency)}
                    </p>
                  </div>
                </div>

                {order.amountDiscount ? (
                  <div className='mt-4 px-4 py-2 sm:px-6 sm:py-4 bg-yellow-50 rounded-b-lg'>
                    <p className='text-red-600 font-medium mb-1 text-sm sm:text-base'>
                      Discount applied:{' '}
                      {formatCurrency(order.amountDiscount, order.currency)}
                    </p>
                    <p className='text-sm text-gray-600'>
                      Original subtotal:{' '}
                      {formatCurrency(
                        (order.totalPrice ?? 0) + order.amountDiscount,
                        order.currency
                      )}
                    </p>
                  </div>
                ) : null}
                <div className='px-4 py-3 sm:px-6 sm:py-4'>
                  <p className='text-sm font-semibold text-gray-600 mb-3 sm:mb-4'>
                    Order items
                  </p>

                  <div className='space-y-3 sm:space-y-4'>
                    {order.products?.map((product) => (
                      <div
                        key={product.product?._id}
                        className='flex flex-row [@media(max-width:340px)]:flex-col [@media(max-width:340px)]:items-start items-center justify-between gap-3 py-2 border-b border-yellow-200 last:border-b-0'
                      >
                        <div className='flex items-center gap-3 sm:gap-4 pb-3'>
                          {product.product?.image && (
                            <div className='relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden'>
                              <Image
                                src={imageUrl(product.product.image).url()}
                                alt={product.product.name ?? ''}
                                fill
                                className='object-cover'
                              />
                            </div>
                          )}
                          <div>
                            <p className='font-medium text-sm sm:text-base'>
                              {product.product?.name}
                            </p>
                            <p className='text-sm text-gray-600'>
                              Quantity: {product.quantity || 'N/A'}
                            </p>
                          </div>
                        </div>
                        <p className='font-medium text-right'>
                          {product.product?.price && product.quantity
                            ? formatCurrency(
                                product.product.price * product.quantity,
                                order.currency
                              )
                            : 'N/A'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
