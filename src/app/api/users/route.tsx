import { NextResponse } from 'next/server';
import { findAllusers } from '@/actions/users';
import { addUser } from '@/actions/users';

export async function GET() {
  const users = await findAllusers();
  return NextResponse.json({
    users,
  });
}

export async function POST(request: Request) {
  const data = await request.json();

  await addUser(data);

  return NextResponse.json({
    data,
  });
}
