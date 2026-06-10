import { Box } from "@mui/material";
import TestsList from "../../components/tests/TestsList";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import TestsPageHeader from "@/components/tests/TestsPageHeader";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    redirect("/login");
  }

  const userTestResult = await prisma.testResult.findMany({
    where: {
      userId: session.user.id,
    },
  });

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
