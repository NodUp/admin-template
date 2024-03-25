import { NextResponse } from 'next/server';
import { findAllusers } from '@/actions/user-action';

export async function GET() {
  const users = await findAllusers();
  return NextResponse.json({
    users,
  });
}

export async function POST(request: Request) {
  const data = await request.json();

  return NextResponse.json({
    data,
  });
}