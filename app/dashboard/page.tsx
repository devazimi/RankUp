import { Box, Typography } from "@mui/material";
import TestsList from "../../components/tests/TestsList";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
      <TestsList userResults={userTestResult} />
    </Box>
  );
}
