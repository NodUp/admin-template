'use server';

import { prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache';
import { updateData } from '@/lib/firebase';
import { getCompanyId } from './companies';

const getSockValue = async (
  type: string,
  entryId: string,
  productId: string,
  qtd: string
): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    if (type === 'add') {
      const stock = await prisma.stocks.findMany({
        where: {
          productId,
        },
      });

      if (stock && stock.length > 0) {
        resolve(parseInt(stock[0].qtd.toString()) + parseFloat(qtd.toString()));
      }
    } else if (type === 'update') {
      const entry = await prisma.entries.findUnique({
        where: {
          id: entryId,
        },
      });

      const stock = await prisma.stocks.findMany({
        where: {
          productId,
        },
      });

      if (entry && stock && stock.length > 0) {
        resolve(
          parseInt(stock[0].qtd.toString()) === 0
            ? parseInt(qtd)
            : parseInt(stock[0].qtd.toString()) -
                parseInt(entry.qtd ? entry.qtd.toString() : '0') +
                parseInt(qtd)
        );
      }
    } else {
      const entry = await prisma.entries.findUnique({
        where: {
          id: entryId,
        },
      });

      if (entry) {
        const stock = await prisma.stocks.findMany({
          where: {
            productId: entry.productId,
          },
        });

        if (stock && stock.length > 0) {
          resolve(
            parseInt(stock[0].qtd.toString()) -
              parseInt(entry.qtd ? entry.qtd.toString() : '0')
          );
        }
      }
    }
  });
};

export const addEntry = async (formData: any) => {
  const {
    productId,
    departureDate,
    arrivalDate,
    transportation,
    container,
    invoice,
    damage,
    status,
    qtd,
  } = formData;

  await prisma.entries.create({
    data: {
      productId,
      departureDate,
      arrivalDate,
      transportation,
      container,
      invoice,
      damage,
      status,
      qtd: parseInt(qtd.trim()),
      createAt: new Date(),
      updateAt: new Date(),
    },
  });

  await prisma.stocks.updateMany({
    where: {
      productId,
    },
    data: {
      qtd: await getSockValue('add', '', productId, qtd),
    },
  });

  updateData(productId);
  revalidatePath('/admin/products/*');
};

export const updateEntry = async (formData: any, id: string) => {
  const {
    productId,
    departureDate,
    arrivalDate,
    transportation,
    container,
    invoice,
    damage,
    status,
    qtd,
  } = formData;

  const stockValue = await getSockValue('update', id, productId, qtd);

  await prisma.entries.update({
    where: {
      id,
    },
    data: {
      productId,
      departureDate,
      arrivalDate,
      transportation,
      container,
      invoice,
      damage,
      status,
      qtd: parseInt(qtd.trim()),
      updateAt: new Date(),
    },
  });

  await prisma.stocks.updateMany({
    where: {
      productId,
    },
    data: {
      qtd: stockValue,
    },
  });

  updateData(productId);
  revalidatePath('/admin/products/*');
};

export const getEntries = async () => {
  const entries = await prisma.entries.findMany({
    where: {
      product: {
        companyId: await getCompanyId(),
      },
    },
    include: {
      product: true,
    },
    orderBy: [{ updateAt: 'desc' }],
  });

  return entries;
};

export const getEntryById = async (id: string) => {
  const entry = await prisma.entries.findUnique({
    where: {
      id: id,
    },
    include: {
      product: true,
    },
  });

  return entry;
};

export const deleteEntry = async (id: string, productId: string) => {
  await prisma.stocks.updateMany({
    where: {
      productId,
    },
    data: {
      qtd: await getSockValue('delete', id, '', '0'),
    },
  });

  await prisma.entries.delete({
    where: {
      id,
    },
  });

  updateData(productId);
  revalidatePath('/admin/products/*');
};
