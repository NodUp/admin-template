import { NextResponse } from 'next/server';
import { getAllCities } from '@/actions/cities';

export async function GET(request: Request, context: any) {
  const { params } = context;

  const states = await getAllCities(params.id);

  return NextResponse.json({
    states,
  });
}
