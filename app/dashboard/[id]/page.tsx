import Test, { Params, Question } from "@/app/types/testsType";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

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

  return (
  <Box component={'section'} sx={{minWidth: '100%', minHeight: '100vh'}}>
    <Stack>

    {test?.title}
    </Stack>
  </Box>
  );
}
