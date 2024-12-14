import { editProduct, getProductById } from '@/actions/products';
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: any) {
  const { params } = context;

  const users = await getProductById(params.id);

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

  await editProduct({ id: params.id, ...data });

  return NextResponse.json({
    data,
  });
}
