import clsx from 'clsx';

import type { Size } from '@/interfaces';

interface Props {
  selectedSize: Size;
  availableSizes: Size[];
}

export const SizeSelector = ({ availableSizes, selectedSize }: Props) => {
  return (
    <div className='my-5'>
      <h3 className='mb-4 text-sm font-bold'>Available Sizes</h3>

      <div className='flex'>
        {availableSizes.map((size) => (
          <button
            key={size}
            className={clsx('mx-2 text-lg hover:underline', {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
