import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

export default function EmptyPage() {
  return (
    <div className='flex h-[800px] items-center justify-center'>
      <IoCartOutline size={80} className='mx-5' />

      <div className='flex flex-col items-center'>
        <h1 className='text-xl font-semibold'>Your cart is empty</h1>

        <Link href='/' className='text-4xl text-slate-950'>
          Go back
        </Link>
      </div>
    </div>
  );
}
