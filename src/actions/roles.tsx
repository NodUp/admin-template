'use server';

import { Roles as AllRoles } from '@prisma/client';

export type Roles = {
  id: string;
  name: string | unknown;
};

export const getAllRoles = async (): Promise<Roles[]> => {
  return Object.entries(AllRoles).map(([key, value]) => ({
    id: key,
    name: value,
  }));
};
