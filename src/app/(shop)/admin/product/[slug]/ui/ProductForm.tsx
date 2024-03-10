'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { CategoryDB, Product, ProductImage as ProductWithImage } from '@/interfaces';
import { createUpdateProduct, deleteProductImage } from '@/actions';
import { ProductImage } from '@/components';

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories: CategoryDB[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  categoryId: string;

  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(', '),
      sizes: product.sizes ?? [],

      images: undefined,
    },
  });

  watch('sizes');

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues('sizes'));

    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue('sizes', Array.from(sizes));
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append('id', product.id ?? '');
    }

    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('gender', productToSave.gender);

    // Agregamos las imágenes si existen, lo hacemos de esta forma ya que es un FileList y no es posible iterar fácilmente
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      alert('Product could not be updated!.');
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mb-16 grid grid-cols-1 gap-3 px-5 sm:grid-cols-2 sm:px-0'
    >
      {/* Textos */}
      <div className='w-full'>
        <div className='mb-2 flex flex-col'>
          <span>Title</span>
          <input
            type='text'
            className='rounded-md border bg-gray-200 p-2'
            {...register('title', { required: true })}
          />
        </div>

        <div className='mb-2 flex flex-col'>
          <span>Slug</span>
          <input
            type='text'
            className='rounded-md border bg-gray-200 p-2'
            {...register('slug', { required: true })}
          />
        </div>

        <div className='mb-2 flex flex-col'>
          <span>Description</span>
          <textarea
            rows={5}
            className='rounded-md border bg-gray-200 p-2'
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className='mb-2 flex flex-col'>
          <span>Price</span>
          <input
            type='number'
            className='rounded-md border bg-gray-200 p-2 '
            {...register('price', { required: true, min: 0 })}
          />
        </div>

        <div className='mb-2 flex flex-col'>
          <span>Stock</span>
          <input
            type='number'
            className='rounded-md border bg-gray-200 p-2 '
            {...register('inStock', { required: true, min: 0 })}
          />
        </div>

        <div className='mb-2 flex flex-col'>
          <span>Tags</span>
          <input
            type='text'
            className='rounded-md border bg-gray-200 p-2'
            {...register('tags', { required: true })}
          />
        </div>

        <div className='mb-2 flex flex-col'>
          <span>Gender</span>
          <select
            className='rounded-md border bg-gray-200 p-2'
            {...register('gender', { required: true })}
          >
            <option value=''>[Seleccione]</option>
            <option value='men'>Men</option>
            <option value='women'>Women</option>
            <option value='kid'>Kid</option>
            <option value='unisex'>Unisex</option>
          </select>
        </div>

        <div className='mb-2 flex flex-col'>
          <span>Categories</span>
          <select
            className='rounded-md border bg-gray-200 p-2'
            {...register('categoryId', { required: true })}
          >
            <option value=''>[Seleccione]</option>
            {categories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <button className='btn-primary w-full'>Save</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className='w-full'>
        {/* As checkboxes */}
        <div className='flex flex-col'>
          <span>Sizes</span>
          <div className='flex flex-wrap'>
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => onSizeChange(size)}
                className={clsx(
                  'mr-2  flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border',
                  {
                    'bg-gray-900 text-gray-200': getValues('sizes').includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          {/* Imágenes */}
          <div className='mb-2 flex flex-col'>
            <span>Photos</span>
            <input
              type='file'
              {...register('images')}
              multiple
              className='rounded-md border bg-gray-200 p-2'
              accept='image/png, image/jpeg, image/avif'
            />
          </div>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <ProductImage
                  src={image.url}
                  alt={product.title ?? ''}
                  width={300}
                  height={300}
                  className='rounded-t shadow-md'
                />
                <button
                  type='button'
                  onClick={() => deleteProductImage(image.id, image.url)}
                  className='btn-danger w-full rounded-b-xl'
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
