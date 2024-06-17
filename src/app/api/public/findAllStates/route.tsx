import { NextResponse } from 'next/server';
import { getAllStates } from '@/actions/states';

export async function GET() {
  const states = await getAllStates();

  return NextResponse.json({
    states,
  });
}
