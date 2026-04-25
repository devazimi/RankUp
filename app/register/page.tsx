"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import z from "zod";

const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors] = useState<any>({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");

    // Validation
    const data = { username, email, password, confirmPassword };
    const result = registerSchema.safeParse(data);

    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        setServerError(responseData.error || "Registration failed");
        return;
      }

      router.push("/login?registered=true");
    } catch (err) {
      setServerError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getError = (fieldName: string) => {
    return errors?.[fieldName]?._errors?.[0];
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
            Create account
          </Typography>
          <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: 14 }}>
            Get started with your free account
          </Typography>
        </Box>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            fullWidth
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) {
                const newErrors = { ...errors };
                delete newErrors.username;
                setErrors(newErrors);
              }
            }}
            error={!!getError("username")}
            helperText={getError("username")}
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
            error={!!getError("email")}
            helperText={getError("email")}
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
            error={!!getError("password")}
            helperText={getError("password")}
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
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) {
                const newErrors = { ...errors };
                delete newErrors.confirmPassword;
                setErrors(newErrors);
              }
            }}
            error={!!getError("confirmPassword")}
            helperText={getError("confirmPassword")}
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
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: 13 }}>
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "#4f46e5",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
