import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';


export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return NextResponse.json({ 
      message: 'User created successfully',
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error: any) {
  console.error("REGISTER ERROR FULL:");
  console.dir(error, { depth: null });

  return NextResponse.json(
    {
      error: error?.message || "Registration failed"
    },
    { status: 500 }
  );
}
}