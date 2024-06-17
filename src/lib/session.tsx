import { SessionOptions } from 'iron-session';

export interface SessionData {
  id?: string;
  name?: string;
  email?: string;
  img?: string;
  role?: string;
  isLoggoedIn?: boolean;
  companyId?: string;
  logo?: string | null;
}

export const defaultSession: SessionData = {
  isLoggoedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: 'template_session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
  },
};
