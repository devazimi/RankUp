import { Box, Typography, Button } from "@mui/material";

interface ErrorUiProps {
  setError: (value: boolean) => void;
  retryFetch: () => void;
}

export default function ErrorUI({ setError, retryFetch }: ErrorUiProps) {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        px: 3,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          backgroundColor: "#fef2f2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "pulse 2s infinite",
          "@keyframes pulse": {
            "0%, 100%": { transform: "scale(1)", opacity: 1 },
            "50%": { transform: "scale(1.05)", opacity: 0.8 },
          },
        }}
      >
        <Typography sx={{ fontSize: 40 }}>⚠️</Typography>
      </Box>

      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#1e293b",
            mb: 1,
            fontSize: { xs: 18, sm: 22 },
          }}
        >
          Something went wrong
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#94a3b8",
            maxWidth: 400,
            fontSize: { xs: 13, sm: 15 },
            lineHeight: 1.6,
          }}
        >
          We couldn&apos;t load the tests. Check your connection and try again.
        </Typography>
      </Box>

      <Button
        variant="outlined"
        onClick={() => {
          setError(false);
          retryFetch();
        }}
        sx={{
          mt: 1,
          px: 4,
          py: 1.2,
          borderRadius: 2,
          borderColor: "#e2e8f0",
          color: "#4f46e5",
          fontWeight: 600,
          fontSize: 14,
          textTransform: "none",
          transition: "all 0.2s ease",
          "&:hover": {
            borderColor: "#4f46e5",
            backgroundColor: "#f8f7ff",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.15)",
          },
        }}
      >
        ⟳ Try Again
      </Button>
    </Box>
  );
}
