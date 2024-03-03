import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

export default function EmptyPage() {
  return (
    <div className='flex h-[800px] items-center justify-center'>
      <IoCartOutline size={80} className='mx-5' />

      <div className='flex flex-col items-center'>
        <h1 className='text-xl font-semibold'>Your cart is empty</h1>

        <Link
          href='/'
          className='mt-2 rounded-2xl bg-slate-950 px-4 py-2 text-2xl text-slate-200 transition-all duration-300 hover:bg-slate-700'
        >
          Go home page
        </Link>
      </div>
    </div>
  );
}
