import { NextResponse } from 'next/server';
import { getSession } from '@/actions/session';

export async function POST(request: Request) {
  const session = await getSession();

  session.destroy();

  return NextResponse.json(
    {
      msg: 'Logout efetuado com sucesso !',
    },
    { status: 200 }
  );
}
