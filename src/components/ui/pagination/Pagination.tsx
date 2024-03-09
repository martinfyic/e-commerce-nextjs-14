'use client';

import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';

import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import clsx from 'clsx';

import { generatePagination } from '@/utils';

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageString = searchParams.get('page') ?? 1;
  let currentPage = isNaN(+pageString) ? 1 : +pageString;

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }

  const allPages = generatePagination(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`;
    }

    if (Number(pageNumber) <= 0) {
      return `${pathname}`;
    }

    if (Number(pageNumber) > totalPages) {
      params.set('page', totalPages.toString());
      return `${pathname}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className='mb-32 mt-10 flex items-center justify-center'>
      <nav aria-label='Page navigation example'>
        <ul className='list-style-none flex'>
          <li>
            <Link
              className='relative mr-2 block rounded-lg  border-0 bg-transparent px-2 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none'
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {allPages.map((page, index) => (
            <li key={`${page}-${index}`}>
              <Link
                className={clsx(
                  'page-link relative block rounded border-0   px-3 py-1.5  outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none',
                  {
                    'bg-gray-900 font-semibold text-gray-200 shadow-md':
                      Number(page) === currentPage,
                    'bg-transparent text-gray-800': Number(page) !== currentPage,
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li>
            <Link
              className='page-link relative ml-2 block rounded-lg border-0  bg-transparent px-2 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none'
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
