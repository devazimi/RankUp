"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import z from "zod";
import { Box, Typography, TextField, Button } from "@mui/material";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type ZodFormattedErrors = z.ZodFormattedError<z.infer<typeof loginSchema>>;

export default function LoginPage() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const router = useRouter();

  const [errors, setErrors] = useState<ZodFormattedErrors>({} as ZodFormattedErrors);
  const [serverError, setServerError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");

    // Validation
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    setErrors({} as ZodFormattedErrors);
    setIsLoading(true);

    try {
      const fetchResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (fetchResult?.error) {
        setServerError(fetchResult.error);
        return;
      }

      if (fetchResult?.ok) {
        router.push("/dashboard");
      }
    } catch (err) {
      setServerError("Network error. Please try again. ");
      return err;
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldError = (fieldName: "email" | "password"): string | undefined => {
    if (errors && errors[fieldName]?._errors?.[0]) {
      return errors[fieldName]._errors[0];
    }
    return undefined;
  };

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
          maxWidth: 400,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          border: "1px solid #e2e8f0",
          p: { xs: 3, sm: 5 },
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#1e293b",
              mb: 0.5,
              fontSize: { xs: 20, sm: 24 },
            }}
          >
            Welcome back
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#94a3b8", fontSize: 14 }}
          >
            Sign in to your account
          </Typography>
        </Box>

        {/* Success Message */}
        {registered === "true" && (
          <Typography
            sx={{
              bgcolor: "#f0fdf4",
              color: "#166534",
              border: "1px solid #bbf7d0",
              borderRadius: 2,
              py: 1.5,
              px: 2,
              mb: 3,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Registration successful! Please sign in.
          </Typography>
        )}

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            fullWidth
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                const newErrors = { ...errors };
                delete newErrors.email;
                setErrors(newErrors);
              }
            }}
            error={!!getFieldError("email")}
            helperText={getFieldError("email")}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontSize: 14,
                "&:hover fieldset": {
                  borderColor: "#4f46e5",
                },
              },
            }}
          />

          <TextField
            fullWidth
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                const newErrors = { ...errors };
                delete newErrors.password;
                setErrors(newErrors);
              }
            }}
            error={!!getFieldError("password")}
            helperText={getFieldError("password")}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontSize: 14,
                "&:hover fieldset": {
                  borderColor: "#4f46e5",
                },
              },
            }}
          />

          {/* Server Error */}
          {serverError && (
            <Typography
              sx={{
                color: "#ef4444",
                fontSize: 13,
                textAlign: "center",
                bgcolor: "#fef2f2",
                py: 1.5,
                borderRadius: 2,
                border: "1px solid #fee2e2",
              }}
            >
              {serverError}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            variant="contained"
            sx={{
              mt: 1,
              py: 1.5,
              bgcolor: "#4f46e5",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              fontSize: 15,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#4338ca",
                boxShadow: "none",
              },
              "&:disabled": {
                bgcolor: "#e2e8f0",
                color: "#94a3b8",
              },
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: 13 }}>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              style={{
                color: "#4f46e5",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}