'use server';

import { prisma } from '../lib/prisma';
import type { Cities } from '@prisma/client';

export const getAllCities = async (
  stateId: string | null | undefined
): Promise<Cities[]> => {
  return await prisma.cities.findMany({
    where: {
      stateId: stateId ? stateId : '',
    },
  });
};
