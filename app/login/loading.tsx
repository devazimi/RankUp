"use client";

import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <CircularProgress
          size={80}
          sx={{
            color: "#4b7995",
          }}
        />
      </Box>
    </Box>
  );
}