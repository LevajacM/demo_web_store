import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode';

const YearlySaleBanner = async () => {
  const sale = await getActiveSaleByCouponCode('YSALE');

  if (!sale?.isActive) return null;

  return (
    <div className='bg-gradient-to-r from-yellow-500 to-gray-300 text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex-1'>
          <h2 className='text-3xl sm:text-5xl font-extrabold text-left mb-4'>
            {sale?.title}
          </h2>

          <p className='text-left text-xl sm:text-3xl font-semibold mb-6'>
            {sale.description}
          </p>

          <div className='flex'>
            <div className='bg-white text-black px-6 py-4 rounded-xl shadow-md shadow-yellow-800 transform hover:scale-110 hover:shadow-xl transition duration-500 ease-in-out cursor-pointer'>
              <span className='font-bold text-base sm:text-xl'>
                Use Code:{' '}
                <span className='text-yellow-600'>{sale.couponCode}</span>
              </span>
              <span className='ml-2 font-bold text-base sm:text-xl'>
                for {sale.discountAmount}% discount
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlySaleBanner;
