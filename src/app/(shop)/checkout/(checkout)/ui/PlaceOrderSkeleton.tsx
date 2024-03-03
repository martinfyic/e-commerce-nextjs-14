export const PlaceOrderSkeleton = () => {
  return (
    <div className='flex animate-pulse flex-col rounded-xl bg-gray-200 p-3 sm:p-7'>
      <div className='mb-2 h-8 rounded bg-gray-300'></div>
      <div className='mb-10'>
        <div className='mb-2 h-6 rounded bg-gray-300'></div>
        <div className='mb-2 h-4 rounded bg-gray-300'></div>
        <div className='mb-2 h-4 rounded bg-gray-300'></div>
        <div className='mb-2 h-4 rounded bg-gray-300'></div>
        <div className='mb-2 h-4 rounded bg-gray-300'></div>
      </div>

      <div className='mb-10 h-0.5 w-full bg-white'></div>

      <div className='mb-2 h-8 rounded bg-gray-300'></div>
      <div className='grid grid-cols-2'>
        <div className='mb-2 h-4 w-3/4 rounded bg-gray-300'></div>
        <div className='mb-2 h-4 w-1/4 rounded bg-gray-300 text-right'></div>

        <div className='mb-2 h-4 w-3/4 rounded bg-gray-300'></div>
        <div className='mb-2 h-4 w-1/4 rounded bg-gray-300 text-right'></div>

        <div className='mb-2 h-4 w-3/4 rounded bg-gray-300'></div>
        <div className='mb-2 h-4 w-1/4 rounded bg-gray-300 text-right'></div>

        <div className='mt-5 h-6 w-3/4 rounded bg-gray-300'></div>
        <div className='mt-5 h-6 w-1/4 rounded bg-gray-300 text-right'></div>
      </div>

      <div className='flex-1'></div>

      <div className='mb-2 mt-5 w-full'>
        <div className='mb-5 h-4 rounded bg-gray-300'></div>
        <div className='btn-primary flex h-12 justify-center rounded'></div>
      </div>
    </div>
  );
};
