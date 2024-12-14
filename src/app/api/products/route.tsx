import { addProduct, getProducts } from '@/actions/products';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await getProducts();
  return NextResponse.json({
    products,
  });
}

export async function POST(request: Request) {
  const data = await request.json();

  const { success } = await addProduct(data);

  if (success) {
    return NextResponse.json({
      data,
    });
  }

  return NextResponse.json(
    { error: 'Erro ao executar a operação!' },
    { status: 400 }
  );
}
