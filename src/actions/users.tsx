'use server';

import { getString, toJson } from '@/utils';
import { Roles, UserStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { prisma } from '../lib/prisma';
import { getCompanyId, getCompanyIdDefault } from './companies';
import { sendEmail } from './email';
const bcrypt = require('bcrypt');

type User = {
  name: string;
  email: string;
  password: string;
  confirm_password?: string;
  role?: Roles;
  stateId: string;
  cityId: string;
  status: UserStatus;
  companyId?: string;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
    include: {
      company: true,
    },
  });

  if (
    user &&
    user.status === 'ATIVO' &&
    (await bcrypt.compare(password, user && user.password))
  ) {
    const person = await prisma.persons.findFirst({
      where: {
        userId: user.id,
      },
    });
    return {
      id: user.id,
      name: person?.name,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      logo: user.company ? user.company.logo : null,
    };
  }

  return null;
};

export async function addUser(
  formData: User
): Promise<{ success: boolean; data: any }> {
  try {
    const user = await prisma.$transaction(async (tx: any) => {
      let companyId: any = await getCompanyId();

      if (!companyId) {
        companyId = await getCompanyIdDefault();
      }

      const encryptedPassword = await bcrypt.hash(formData.password, 8);
      const user = await tx.users.create({
        data: {
          role: formData.role ? formData.role : 'COMUM',
          email: formData.email,
          password: encryptedPassword,
          status: formData.status,
          companyId,
        },
      });

      await tx.persons.create({
        data: {
          name: formData.name,
          userId: user.id,
          stateId: formData.stateId,
          cityId: formData.cityId,
        },
      });

      return user;
    });

    revalidatePath('/admin/users/*');

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
    };
  }
}

export async function editUser(
  id: string,
  formData: User
): Promise<{ success: boolean; data: any }> {
  const { name, email, role, cityId, stateId, status } = formData;

  try {
    const person = await prisma.persons.findMany({
      where: {
        userId: id,
      },
    });

    const user = await prisma.$transaction(async (tx: any) => {
      await tx.persons.update({
        data: {
          name,
          cityId,
          stateId,
        },
        where: {
          id: person[0].id,
        },
      });

      const user = await tx.users.update({
        data: {
          email,
          status,
          role,
        },
        where: {
          id,
        },
      });

      return user;
    });

    revalidatePath('/admin/users/*');

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
    };
  }
}

export async function findAllusers(): Promise<any[]> {
  const companyId = await getCompanyId();

  const usersDb = await prisma.users.findMany({
    where: {
      companyId,
    },
    include: {
      person: true,
    },
  });

  return toJson(usersDb);
}

export async function findById(id: string): Promise<any> {
  const userDb = await prisma.users.findUnique({
    where: {
      id,
    },
    include: {
      person: true,
    },
  });

  return toJson(userDb);
}

export async function deleteUser(id: string) {
  await prisma.users.update({
    where: {
      id,
    },
    data: {
      status: 'INATIVO',
    },
  });

  revalidatePath('/admin/users/*');
}

export async function forgotPassword(email: string) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
      include: {
        person: true,
      },
    });

    const newPassword = await getString(8);

    const encryptedPassword = await bcrypt.hash(newPassword, 8);

    await prisma.users.update({
      where: {
        id: user?.id,
      },
      data: {
        password: encryptedPassword,
      },
    });

    sendEmail(
      email,
      'Recueração de Senha',
      `Olá, ${user?.person[0].name}`,
      `Você solicitou uma nova senha. Sua nova senha é: ${newPassword}`,
      'Este e-mail foi gerado automaticamente pelo sistema e não deve ser respondido.'
    );

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
}

export async function changePassword(id: string, newPassword: string) {
  const encryptedPassword = await bcrypt.hash(newPassword, 8);

  try {
    const user = await prisma.users.update({
      where: {
        id,
      },
      data: {
        password: encryptedPassword,
      },
    });

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
    };
  }
}
