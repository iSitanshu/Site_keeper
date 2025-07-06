import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, name, password } = await request.json();

    if (!email || !name || !password)
      return NextResponse.json(
        { error: "All field are required" },
        { status: 400 }
      );

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser)
      return NextResponse.json(
        { error: "User already registered" },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User Registered Successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("In Auth Router while Registering - ", error);
    return NextResponse.json(
      { error: "Failed to Register User" },
      { status: 500 }
    );
  }
}
