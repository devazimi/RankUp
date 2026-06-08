import  { Params } from "@/app/types/testsType";
import { Box } from "@mui/material";
import TestPlay from "@/components/tests/TestPlay";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function TestPage({ params }: Params) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
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

  return (
    <Box component={"section"} sx={{ minWidth: "100%", minHeight: "100vh" }}>
      <TestPlay test={test} />
    </Box>
  );
}
