import Test, { Params, Question } from "@/app/types/testsType";
import { Box, Stack, Typography } from "@mui/material";
import TestPlay from "@/components/tests/TestPlay";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// async function getTestResult(userId: string) {

//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/testResults/${userId}`, {
//       method: "GET",
//     })

//     if(!res.ok){
//       console.log('cannot fetch data');
//       return null;
//     }

//     const testResult = await res.json();

//     return testResult;
// }

export default async function TestPage({ params }: Params) {
  const { id: testId } = await params;

  console.log("testID: ", testId);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/tests/${testId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log("error fetching test");
    throw new Error("failed fetch test");
  }

  const test = await res.json();

  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  if (!userId) {
    return <>log in please</>;
  }

  const previousResults = await prisma.testResult.findMany({
    where: {userId: userId, testId: testId}
  });

  console.log('previous results: ', previousResults)

  // let userTestResult;

  // try {
  //   const resultRes = await fetch(
  //     `${baseUrl}/api/testResults?testId=${testId}`,
  //     {
  //       headers: {
  //         Cookie: `next-auth.session-token=${session?.sessionToken || ""}`,
  //       },
  //     },
  //   );

  //   if (resultRes.ok) {
  //     const data = await resultRes.json();

  //     // previousAttempts = data.stats?.totalAttemts || 0;
  //     userTestResult = data;
  //   }
  // } catch (err) {
  //   console.error("error getting test results: ", err);
  // }

  // console.log(`user test result attempts: ${userTestResult}`);
  // const testResult = await getTestResult(userId)

  // console.log('testResult of user : ', testResult);

  return (
    <Box component={"section"} sx={{ minWidth: "100%", minHeight: "100vh" }}>
      <TestPlay test={test} />
    </Box>
  );
}
