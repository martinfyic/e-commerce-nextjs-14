import Link from 'next/link';

import { titleFont } from '@/config/fonts';

export const Footer = () => {
  return (
    <div className='mb-10 flex w-full justify-center gap-4 text-xs'>
      <Link href='/'>
        <span className={`${titleFont.className} font-bold antialiased`}>Sigma</span>
        <span> | shop </span>
        <span>&#169; {new Date().getFullYear()}</span>
      </Link>

      <Link href='/'>Privacy & Legal</Link>

      <Link href='/'>Locations</Link>
    </div>
  );
};
