'use server';

import { toJson } from '@/utils';
import type { Products } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { prisma } from '../lib/prisma';
import { getCompanyId } from './companies';

export const getProducts = async (): Promise<Products[]> => {
  const products = await prisma.stocks.findMany({
    where: {
      product: {
        companyId: await getCompanyId(),
      },
    },
    include: { product: true },
    orderBy: [{ product: { name: 'asc' } }],
  });

  return products.map((i: any) => {
    return {
      id: i.product.id,
      name: i.product.name,
      qtd: i.qtd.toString(),
      companyId: i.product.companyId,
    };
  });
};

export const getOnlyProducts = async (): Promise<any[]> => {
  const products = await prisma.products.findMany({
    where: {
      companyId: await getCompanyId(),
    },
    orderBy: [
      {
        name: 'asc',
      },
    ],
  });

  return toJson(products);
};

export const addProduct = async (formData: any) => {
  const { name } = formData;
  const companyId = await getCompanyId();

  try {
    const product = await prisma.products.create({
      data: {
        name: name,
        companyId,
        stock: {
          create: {
            qtd: 0,
          },
        },
      },
    });
    revalidatePath('/admin/products/*');

    return {
      success: true,
      data: toJson(product),
    };
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
};

export const getProductById = async (id: string): Promise<Products | null> => {
  const product = await prisma.products.findUnique({
    where: {
      id: id,
    },
  });

  return toJson(product);
};

export const editProduct = async (product: any) => {
  try {
    const productDb = await prisma.products.update({
      data: product,
      where: {
        id: product.id,
      },
    });
    revalidatePath('/admin/products/*');
    return {
      success: true,
      data: toJson(productDb),
    };
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
};

export const deleteProduct = async (id: string) => {
  await prisma.$transaction(async (tx) => {
    const stock: any = await tx.stocks.findFirst({
      where: {
        productId: id,
      },
    });

    await tx.stocks.delete({
      where: {
        id: stock.id,
      },
    });

    await tx.products.delete({
      where: {
        id: id,
      },
    });
  });
  revalidatePath('/admin/products/*');
};
