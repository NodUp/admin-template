import { NextResponse } from 'next/server';
import { forgotPassword } from '@/actions/users';

export async function PUT(request: Request) {
  const data = await request.json();

  await forgotPassword(data.email);

  return NextResponse.json({
    msg: 'Instruções enviadas para o e-mail informado!',
  });
}
