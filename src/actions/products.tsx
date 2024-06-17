'use server';

import { prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache';

import type { Products } from '@prisma/client';
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

  return products;
};

export const addProduct = async (formData: any) => {
  const { name } = formData;
  const companyId = await getCompanyId();

  await prisma.products.create({
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
};

export const getProductById = async (id: string): Promise<Products | null> => {
  const product = await prisma.products.findUnique({
    where: {
      id: id,
    },
  });

  return product;
};

export const editProduct = async (product: any) => {
  await prisma.products.update({
    data: product,
    where: {
      id: product.id,
    },
  });
  revalidatePath('/admin/products/*');
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

export const getAllMovimentations = async (id: string) => {
  const result = await prisma.$queryRaw`
    select * from (
      select 'Entrada' as tipo, qtd, "updateAt", '' as client from "Entries" e where "productId" = ${id}
      union all 
      select 'Saída' as tipo, qtd, "updateAt", client  from "Departuries" d where "productId" = ${id}
    ) as subquery order by "updateAt" desc`;

  return JSON.parse(JSON.stringify(result));
};
