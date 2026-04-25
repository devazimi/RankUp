"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";

export default function MainPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8fafc",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* Tagline */}
        <Typography
          sx={{
            fontSize: { xs: 12, sm: 14 },
            fontWeight: 600,
            color: "#4f46e5",
            letterSpacing: 1.5,
            textTransform: "uppercase",
            bgcolor: "#eef2ff",
            px: 2,
            py: 0.5,
            borderRadius: 2,
          }}
        >
          Quiz Platform
        </Typography>

        {/* Main Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#1e293b",
            fontSize: { xs: 28, sm: 36, md: 44 },
            lineHeight: 1.2,
            letterSpacing: -0.5,
          }}
        >
          Challenge Your Mind
          <br />
          One Question at a Time
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            color: "#64748b",
            fontSize: { xs: 15, sm: 17 },
            lineHeight: 1.7,
            maxWidth: 480,
          }}
        >
          Step into the ultimate quiz experience — a fast, sleek, and
          intelligent multiple-choice test platform built for learners,
          thinkers, and achievers.
        </Typography>

        {/* CTA Button */}
        <Button
          onClick={() => router.push("/login")}
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            px: 5,
            py: 1.8,
            bgcolor: "#4f46e5",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            fontSize: 16,
            boxShadow: "0 4px 14px rgba(79, 70, 229, 0.25)",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "#4338ca",
              boxShadow: "0 6px 20px rgba(79, 70, 229, 0.35)",
              transform: "translateY(-2px)",
            },
          }}
        >
          Enter the Arena
        </Button>
      </Box>
    </Box>
  );
}
