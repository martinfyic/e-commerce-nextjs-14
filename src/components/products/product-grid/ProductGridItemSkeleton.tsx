export const ProductGridItemSkeleton = () => {
  return (
    <div className='animate-pulse overflow-hidden rounded-md'>
      <div className='h-64 w-64 bg-gray-300'></div>
      <div className='p-4'>
        <div className='mt-2 h-6 w-1/2 rounded bg-gray-300'></div>
        <div className='mt-2 h-6 w-1/3 rounded bg-gray-300'></div>
      </div>
    </div>
  );
};
