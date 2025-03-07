import { deleteUser, editUser, findById } from '@/actions/users';
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: any) {
  const { params } = context;

  const users = await findById(params.id);

  return NextResponse.json(
    {
      ...users,
    },
    {
      status: 200,
    }
  );
}

export async function PUT(request: Request, context: any) {
  const { params } = context;

  const data = await request.json();

  await editUser(params.id, data);

  return NextResponse.json({
    data,
  });
}

export async function DELETE(request: Request, context: any) {
  const { params } = context;

  await deleteUser(params.id);

  return NextResponse.json({
    msg: 'Usuário excluído',
  });
}
