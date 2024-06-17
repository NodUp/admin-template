import { NextResponse } from 'next/server';
import { getSession, loginApi } from '@/actions/session';

export async function POST(request: Request) {
  const data = await request.json();

  await loginApi(data);
  const session = await getSession();

  if (!session.isLoggoedIn) {
    return NextResponse.json(
      {
        msg: 'Credenciais inválidas !',
      },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      session,
    },
    { status: 200, headers: { 'Set-Cookie': `token=${session}` } }
  );
}
