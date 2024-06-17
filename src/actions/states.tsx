'use server';

import { prisma } from '../lib/prisma';
import type { States } from '@prisma/client';

export const getAllStates = async (): Promise<States[]> => {
  return await prisma.states.findMany();
};
