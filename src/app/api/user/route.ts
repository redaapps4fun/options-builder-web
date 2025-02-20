// /api/user

import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import * as z from 'zod';

//Define the schema for input validation
const UserSchema = z.object({
  name: z.string().min(1, 'Username is required').max(100),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name: username } = UserSchema.parse(body);

    //check if email already exists
    const existingUserByEmail = await db.user.findUnique({ where: { email } });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    //check if name already exists
    const existingUserByName = await db.user.findUnique({ where: { username: username } });
    if (existingUserByName) {
      return NextResponse.json(
        { user: null, message: 'User with this name already exists' },
        { status: 409 }
      );
    }

    //hash password
    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        username: username,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { user: userWithoutPassword, message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
