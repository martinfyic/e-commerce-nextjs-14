'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './slideshow.css';
import { ProductImage } from '..';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={
          {
            width: '100vw',
            height: '500px',
            '--swiper-pagination-color': '#dfdbdbc5',
          } as React.CSSProperties
        }
        pagination
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className='mySwiper2'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage src={image} alt={title} width={600} height={500} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
