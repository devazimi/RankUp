import { Box, Typography } from "@mui/material";
import Test from "../types/testsType";
import TestsList from "./TestsList";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getTests() {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseURL}/api/tests`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching tests: ", error);

    return [];
  }
}

export default async function DashboardPage() {
  const initialTests: Test[] | undefined = await getTests();

  const session = await getServerSession(authOptions);

  if(!session?.user.id){
    return <>please login</>
  }

  const userTestResult = await prisma.testResult.findMany({
    where: {
      userId: session.user.id
    }
  });

  console.log('user test result: ', userTestResult);

  // const oneTestResult = userTestResult.filter(r => r.testId ===)
  // const oneTestResult = (testId: string) => {

  return (
    <Box
      component="section"
      sx={{
        maxWidth: "100%",
        minHeight: "100vh",
        padding: { xs: 2, sm: 3, md: 5 },
        backgroundColor: "#f8f9fa",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: "#2d3748",
          textAlign: "center",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Available Tests
      </Typography>
      <TestsList initialTests={initialTests} userResults={userTestResult} />
    </Box>
  );
}
