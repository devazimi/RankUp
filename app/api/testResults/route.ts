import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: "to save test results, login !" },
        { status: 401 },
      );
    }

    const body = await req.json();

    const { testId, score, totalQuestions, answers } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    const testResult = await prisma.testResult.create({
      data: {
        userId: user.id,
        testId,
        totalQuestions,
        score,
        answers: JSON.stringify(answers),
      },
    });

    console.log('Test Result in route: ', testResult)

    return NextResponse.json(
      { message: "test result added successfuly", result: testResult },
      { status: 201 },
    );
  } catch (err) {
    console.error("error saving test result: ", err);
    return NextResponse.json(
      { error: "adding test result failed !", err },
      { status: 500 },
    );
  }
}
