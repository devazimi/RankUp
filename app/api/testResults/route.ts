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

    const previousAttempts = await prisma.testResult.count({
      where: {
        userId: session.user.id,
        testId: testId,
      },
    });

    // const testResult = await prisma.testResult.create({
    //   data: {
    //     userId: user.id,
    //     testId,
    //     totalQuestions,
    //     score,
    //     answers: JSON.stringify(answers),

    //   },
    // });

    const testResult = await prisma.testResult.create({
      data: {
        userId: user.id,
        testId,
        totalQuestions,
        score,
        answers: JSON.stringify(answers),
        attemptNumber: previousAttempts + 1,
      },
    });

    console.log("Test Result in route: ", testResult);

    return NextResponse.json(
      {
        message: "test result added successfuly",
        attemptNumber: testResult.attemptNumber,
        result: testResult,
      },
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

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // const searchParams = new URL(req.url);
    const searchParams = new URLSearchParams(req.url.split("?")[1]);
    const testId = searchParams.get("testId");

    const results = await prisma.testResult.findMany({
      where: {
        userId: session.user.id,
        ...(testId && { testId }),
      },
      orderBy: {
        attemptNumber: "desc",
      },
    });

    const stats = {
      totalAttemps: results.length,
      bestScore:
        results.length > 0 ? Math.max(...results.map((r) => r.score)) : 0,
      lastScore: results[0]?.score || 0,
      averageScore:
        results.length > 0
          ? results.reduce((sum, r) => sum + r.score, 0) / results.length
          : 0,
    };

    return NextResponse.json({ results, stats });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json(
      { error: "error in getting results" },
      { status: 500 },
    );
  }
}
