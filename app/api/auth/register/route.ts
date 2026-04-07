import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
// import { z } from "zod";
// import { stat } from "fs";

// const registerSchema = z.object({
//   username: z.string().min(4, "username must be at least 4 characters"),
//   email: z.string().email("invalid email format"),
//   password: z.string().min(6, "password must be at least 6 characters"),
// });

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required @register/POST" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: "user with this email is already exist @register/POST" },
        { status: 500 },
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
      { id: user.id, email: user.email, username: user.username },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "falid to register user @register/POST" },
      { status: 500 },
    );
  }

  // try {
  //   const body = await req.json();

  //   const parsed = registerSchema.safeParse(body);

  //   if(!parsed.success){
  //       return NextResponse.json({errors: parsed.error.issues.map((err)=> ({
  //           field: err.path[0],
  //           message: err.message,
  //       }))}, {status: 400})
  //   }

  //   const {username, email, password} = parsed.data;

  //   if (!username || !email || !password) {
  //     return NextResponse.json(
  //       { message: "all fields required @register/Post" },
  //       { status: 400 },
  //     );
  //   }

  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const user = await prisma.user.create({
  //     data: {
  //       username,
  //       email,
  //       password: hashedPassword,
  //     },
  //   });

  //   // return the id, email, username to save the password
  //   return NextResponse.json(
  //     {
  //       id: user.id,
  //       email: user.email,
  //       username: user.username,
  //     },
  //     { status: 201 },
  //   );
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // } catch (error: any) {
  //   if (error.code === "P2002") {
  //     return NextResponse.json(
  //       { message: "email already exists @register/POST" },
  //       { status: 400 },
  //     );
  //   }
  //   return NextResponse.json(
  //     { error: "faild to signup user @register/POST" },
  //     { status: 500 },
  //   );
  // }
}
