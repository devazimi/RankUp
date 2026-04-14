import { Box, Typography } from "@mui/material";
import Test from "../types/testsType";
import TestsList from "./TestsList";
import { useSession } from "next-auth/react";

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
  console.log("Tests data:", initialTests);

  // const {data: session, status} = useSession();

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
      <TestsList initialTests={initialTests} />
    </Box>
  );
}
