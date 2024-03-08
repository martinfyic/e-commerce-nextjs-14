import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
  isPaid: boolean;
}

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div
      className={clsx(
        'mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white',
        {
          'bg-red-500': !isPaid,
          'bg-green-500': isPaid,
        }
      )}
    >
      <IoCardOutline size={25} />
      {isPaid ? (
        <span className='mx-2'>Order Paid</span>
      ) : (
        <span className='mx-2'>Pending Payment</span>
      )}
    </div>
  );
};
