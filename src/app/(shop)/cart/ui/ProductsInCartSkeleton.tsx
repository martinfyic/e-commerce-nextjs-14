export const ProductsInCartSkeleton = () => {
  return (
    <>
      <div className='my-2 flex animate-pulse'>
        <div className='mr-5 h-24 w-24 rounded bg-gray-200 shadow-md'></div>

        <div>
          <div className='mb-2 h-4 w-3/4 rounded bg-gray-200 font-semibold'></div>
          <div className='mb-2 h-4 w-1/4 rounded bg-gray-200'></div>
          <div className='flex items-center gap-3'>
            <div className='h-8 w-8 rounded bg-gray-200'></div>
            <span className='h-6 w-20 rounded bg-gray-200 px-5 text-center'></span>
            <div className='h-8 w-8 rounded bg-gray-200'></div>
          </div>
          <div className='mt-3 h-4 w-1/4 rounded bg-gray-200 underline'></div>
        </div>
      </div>
      <div className='my-2 flex animate-pulse'>
        <div className='mr-5 h-24 w-24 rounded bg-gray-200 shadow-md'></div>

        <div>
          <div className='mb-2 h-4 w-3/4 rounded bg-gray-200 font-semibold'></div>
          <div className='mb-2 h-4 w-1/4 rounded bg-gray-200'></div>
          <div className='flex items-center gap-3'>
            <div className='h-8 w-8 rounded bg-gray-200'></div>
            <span className='h-6 w-20 rounded bg-gray-200 px-5 text-center'></span>
            <div className='h-8 w-8 rounded bg-gray-200'></div>
          </div>
          <div className='mt-3 h-4 w-1/4 rounded bg-gray-200 underline'></div>
        </div>
      </div>
    </>
  );
};
