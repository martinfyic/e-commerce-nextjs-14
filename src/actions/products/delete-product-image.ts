'use server';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      error: "Can't delete FS images",
    };
  }

  const imageName = imageUrl.split('/').pop()?.split('.')[0];

  try {
    await cloudinary.uploader.destroy(imageName!);
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    revalidatePath(`/admin/products`);
    revalidatePath(`/products`);
    revalidatePath(`/admin/products/${deletedImage.product.slug}`);
    revalidatePath(`/products/${deletedImage.product.slug}`);
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "Can't delete images",
    };
  }
};
