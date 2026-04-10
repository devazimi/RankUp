"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import z from "zod";

// zod schema for client
const registerSchema = z
  .object({
    username: z.string().min(3, "username must be 4 char and more"),
    email: z.string().email("incorrect email format"),
    password: z.string().min(6, "password must be 6 char and more"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "incorrect confirm password",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors] = useState<any>({});
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        username,
        email,
        password,
        confirmPassword,
      };

      const result = registerSchema.safeParse(data);

      if (!result.success) {
        const formattedErrors = result.error.format();
        setErrors(formattedErrors);
        console.log(errors);
        return;
      }

      console.log("valid data: ", data);
      setErrors(null);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const validData = await res.json();

      if (!res.ok) {
        setErrors(validData.error || "something went wrong @registerPage");
        return;
      }

      console.log("register success!");

      router.push("/login");
    } catch (err) {
      setErrors("error to register");
    }
  };

  // to make code shorter in TextField for error and helperText
  const getError = (fieldName: string) => {
    return errors?.[fieldName]?._errors?.[0];
  };

  return (
    <Box
      component={"section"}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          //   margin: "auto",
          gap: 2,
          padding: 5,
        }}
      >
        <Typography
          variant="h6"
          fontFamily="inherit"
          fontWeight={"bold"}
          color="#6b6b6b"
        >
          Sign Up
        </Typography>
        <TextField
          sx={{ width: 250 }}
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          error={!!getError("username")}
          helperText={getError("username")}
        />
        <TextField
          sx={{ width: 250 }}
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          error={!!getError("email")}
          helperText={getError("email")}
        />
        <TextField
          sx={{ width: 250 }}
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          error={!!getError("password")}
          helperText={getError("password")}
        />
        <TextField
          sx={{ width: 250 }}
          value={confirmPassword}
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!getError("confirmPassword")}
          helperText={getError("confirmPassword")}
        />
        {errors._errors && errors._errors._errors && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errors._errors._errors[0]}
          </Typography>
        )}
        <Button type="submit" variant="contained" size="large" sx={{}}>
          Sign Up
        </Button>
        <Stack flexDirection={"row"} sx={{ justifyContent: "flex-end" }}>
          <Typography variant="body2" fontFamily="inherit">
            <Link href={"/login"}>Already have an account?</Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
