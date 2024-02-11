import { titleFont } from '@/config/fonts';

interface Props {
  title: string;
  subTitle?: string;
  className?: string;
}

export const Title = ({ title, subTitle, className }: Props) => {
  return (
    <div className={`${className} mt-3`}>
      <h1 className={`${titleFont.className} my-7 text-4xl font-semibold antialiased`}>
        {title}
      </h1>

      {subTitle && <h3 className='mb-5 text-xl'>{subTitle}</h3>}
    </div>
  );
};
