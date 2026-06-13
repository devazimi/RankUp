import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(4, "username must be at least 4 characters"),
  email: z.string().email("invalid email format"),
  password: z.string().min(6, "password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 },
      );
    }

    const { username, email, password } = parsed.data;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "all fields required @register/POST" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      { status: 201 },
    );
  }
  catch (err) {
    return NextResponse.json(
      { error: "signUp failed @register/catch" },
      { status: 500 },
    );
  }
}