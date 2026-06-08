import { Box, Typography, Button } from "@mui/material";
import TestsList from "../../components/tests/TestsList";

import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { FaSignOutAlt } from "react-icons/fa";
import TestsPageHeader from "@/components/tests/TestsPageHeader";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return <>please login</>;
  }

  const userTestResult = await prisma.testResult.findMany({
    where: {
      userId: session.user.id,
    },
  });

  console.log("user test result: ", userTestResult);

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
      <TestsPageHeader />
      <TestsList userResults={userTestResult} />
    </Box>
  );
}
