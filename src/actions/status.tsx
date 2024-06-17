'use server';

import { UserStatus } from '@prisma/client';
import { DeparturiesStatus } from '@prisma/client';
import { EntriesStatus } from '@prisma/client';

export type Status = {
  id: string;
  name: string;
};

export const getAllStatus = async (): Promise<Status[]> => {
  return Object.entries(UserStatus).map(([key, value]) => ({
    id: key,
    name: value,
  }));
};

export const getAllDepartureStatus = async (): Promise<Status[]> => {
  return Object.entries(DeparturiesStatus).map(([key, value]) => ({
    id: key,
    name: value,
  }));
};

export const getAllEntriesStatus = async (): Promise<Status[]> => {
  return Object.entries(EntriesStatus).map(([key, value]) => ({
    id: key,
    name: value,
  }));
};
