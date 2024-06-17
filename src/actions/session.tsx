'use server';

import { sessionOptions, SessionData, defaultSession } from '@/lib/session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { login as confirmCredentials } from './users';
import { redirect } from 'next/navigation';

type Login = {
  email: string;
  password: string;
};

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggoedIn) {
    session.isLoggoedIn = defaultSession.isLoggoedIn;
  }

  return session;
};

export const login = async (formData: Login): Promise<SessionData | null> => {
  const user = await confirmCredentials(formData.email, formData.password);

  if (!user) {
    return null;
  }

  const session = await getSession();

  session.id = user.id;
  session.email = user.email;
  session.name = user.name;
  session.role = user.role;
  session.isLoggoedIn = true;
  session.companyId = user.companyId;
  session.logo = user.logo;

  await session.save();

  return session;
};

export const loginWeb = async (formData: Login) => {
  const session = await login(formData);

  if (!session) {
    return { error: 'Credenciais inválidas !' };
  }

  redirect('/admin');
};

export const loginApi = async (formData: Login) => {
  const session = await login(formData);

  if (!session) {
    return null;
  }

  return session;
};

export const logout = async () => {
  const session = await getSession();

  session.destroy();
  redirect('/');
};
