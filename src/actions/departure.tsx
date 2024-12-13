'use server';

import { updateData } from '@/lib/firebase';
import { toJson } from '@/utils';
import { revalidatePath } from 'next/cache';
import { prisma } from '../lib/prisma';
import { getCompanyId } from './companies';

export const addDeparture = async (formData: any) => {
  const {
    productId,
    departureDate,
    client,
    invoice,
    product_value,
    qtd,
    status,
    total,
  } = formData;

  try {
    const stocks = await prisma.stocks.findMany({
      where: {
        productId,
      },
    });

    const [firstStock] = stocks;
    const { qtd: stockQtd }: { qtd: any } = firstStock;

    if (stockQtd >= qtd) {
      await prisma.stocks.updateMany({
        where: {
          productId,
        },
        data: {
          qtd: stockQtd - qtd,
        },
      });

      const departuryDb = await prisma.departuries.create({
        data: {
          productId,
          departureDate,
          client,
          invoice,
          value: product_value,
          qtd,
          status,
          total,
          createAt: new Date(),
          updateAt: new Date(),
        },
      });

      updateData(productId);

      revalidatePath('/admin/products/*');

      return {
        success: true,
        data: toJson(departuryDb),
      };
    } else {
      return {
        success: false,
        data: null,
        message: 'Qtd inválida !',
      };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
};

export const updateDeparture = async (formData: any, id: string) => {
  const {
    productId,
    departureDate,
    client,
    invoice,
    product_value,
    qtd,
    status,
    total,
  } = formData;

  try {
    const departure = await prisma.departuries.findUnique({
      where: {
        id,
      },
    });

    const { qtd: departureQtd }: any = departure;

    const stocks = await prisma.stocks.findMany({
      where: {
        productId,
      },
    });

    const [firstStock] = stocks;
    const { qtd: stockQtd }: { qtd: any } = firstStock;

    if (parseInt(stockQtd) + parseInt(departureQtd) >= qtd) {
      await prisma.departuries.update({
        where: {
          id,
        },
        data: {
          productId,
          departureDate,
          client,
          invoice,
          value: product_value,
          qtd,
          status,
          total,
          updateAt: new Date(),
        },
      });

      await prisma.stocks.updateMany({
        where: {
          productId,
        },
        data: {
          qtd: parseInt(stockQtd) + parseInt(departureQtd) - parseInt(qtd),
        },
      });

      updateData(productId);
      revalidatePath('/admin/products/*');
    }
    return {
      success: true,
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
};

export const getDeparturies = async () => {
  const departuries = await prisma.departuries.findMany({
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

  return toJson(departuries);
};

export const getDepartureById = async (id: string) => {
  const departure = await prisma.departuries.findUnique({
    where: {
      id: id,
    },
    include: {
      product: true,
    },
  });

  return toJson(departure);
};

export const deleteDeparture = async (id: string) => {
  const departury = await prisma.departuries.findUnique({
    where: {
      id,
    },
  });

  const { qtd: departureQtd, productId }: any = departury;

  const stocks = await prisma.stocks.findMany({
    where: {
      productId,
    },
  });

  const [firstStock] = stocks;
  const { id: stockId, qtd: stockQtd } = firstStock;

  await prisma.stocks.update({
    where: {
      id: stockId,
    },
    data: {
      qtd: parseInt(stockQtd.toString()) + parseInt(departureQtd),
    },
  });

  await prisma.departuries.delete({
    where: {
      id,
    },
  });

  updateData(productId);
  revalidatePath('/admin/products/*');
};
