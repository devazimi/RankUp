import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ParamsType {
  params: Promise<{
    userId: string;
  }>;
}

export async function GET(_: Request, { params }: ParamsType) {
  try {
    const { userId } = await params;

    const testResult = await prisma.testResult.findMany({
      where: { userId: userId },
    });

    if (!testResult) {
      return NextResponse.json(
        { message: "error getting test result" },
        { status: 500 },
      );
    }

    return NextResponse.json(testResult);
  } catch (err) {
    console.error("error: ", err);
    return NextResponse.json(
      { error: "error getting test result" },
      { status: 500 },
    );
  }
}
