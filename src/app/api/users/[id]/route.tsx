import { NextResponse } from 'next/server';
import { findById } from '@/actions/users';
import { editUser } from '@/actions/users';

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
