import clsx from 'clsx';

import type { Size } from '@/interfaces';

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];

  onSelectedSize: (size: Size) => void;
}

export const SizeSelector = ({ availableSizes, selectedSize, onSelectedSize }: Props) => {
  return (
    <div className='my-5'>
      <h3 className='mb-4 text-sm font-bold'>Available Sizes</h3>

      <div className='flex'>
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelectedSize(size)}
            className={clsx('mx-1 rounded-md px-2 text-lg', {
              'fade-in bg-gray-900 font-semibold text-gray-200 shadow-md':
                size === selectedSize,
              'fade-in hover:bg-gray-200 hover:shadow-md': size !== selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
