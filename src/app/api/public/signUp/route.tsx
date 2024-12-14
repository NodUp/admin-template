import { addUser } from '@/actions/users';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  const { success } = await addUser(data);

  if (success) {
    return NextResponse.json({
      msg: 'Cadastro realizado com sucesso!',
    });
  }

  return NextResponse.json(
    { error: 'Erro ao executar a operação!' },
    { status: 400 }
  );
}
