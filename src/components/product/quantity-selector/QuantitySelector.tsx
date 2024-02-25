'use client';

import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;

  onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityChanged(quantity + value);
  };

  return (
    <div className='flex'>
      <button onClick={() => onValueChanged(-1)}>
        <IoRemoveCircleOutline size={25} />
      </button>

      <span className='mx-3 w-20 rounded bg-gray-50 px-5 text-center'>{quantity}</span>

      <button onClick={() => onValueChanged(+1)}>
        <IoAddCircleOutline size={25} />
      </button>
    </div>
  );
};
