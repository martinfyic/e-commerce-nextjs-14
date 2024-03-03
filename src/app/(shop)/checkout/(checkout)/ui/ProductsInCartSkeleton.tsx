export const ProductsInCartSkeleton = () => {
  return (
    <>
      <div className='my-2 flex animate-pulse'>
        <div className='mr-5 h-[100px] w-[100px] rounded bg-gray-200 shadow-md'></div>

        <div>
          <div className='mb-2 h-4 w-[200px] rounded bg-gray-200'></div>
          <div className='h-4 w-[200px] rounded bg-gray-200'></div>
        </div>
      </div>
      <div className='my-2 flex animate-pulse'>
        <div className='mr-5 h-[100px] w-[100px] rounded bg-gray-200 shadow-md'></div>

        <div>
          <div className='mb-2 h-4 w-[200px] rounded bg-gray-200'></div>
          <div className='h-4 w-[200px] rounded bg-gray-200'></div>
        </div>
      </div>
    </>
  );
};
