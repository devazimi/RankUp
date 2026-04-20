import Test, { Params, Question } from "@/app/types/testsType";
import { Box, Stack, Typography } from "@mui/material";
import TestPlay from "./TestPlay";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function getTestResult(userId: string) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/testResults/${userId}`, {
      method: "GET",
    })

    if(!res.ok){
      console.log('cannot fetch data');
      return null;
    }

    const testResult = await res.json();

    return testResult;
}

export default async function TestPage({ params }: Params) {
  const { id } = await params;

  console.log("testID: ", id);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tests/${id}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    console.log("error fetching test");
    throw new Error("failed fetch test");
  }

  const test = await res.json();

  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  if(!userId){
    return console.log('no user')
  }

  const testResult = await getTestResult(userId)

  console.log('testResult of user : ', testResult);


  return (
  <Box component={'section'} sx={{minWidth: '100%', minHeight: '100vh'}}>
    <TestPlay test={test} />    
  </Box>
  );
}
