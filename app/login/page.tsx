"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import z, { string } from "zod";

import { Box, Typography, TextField, Button, Stack } from "@mui/material";

const loginSchema = z.object({
  email: z.string().email("incorrect email format"),
  password: z.string().min(6, "invalid password"),
});

type ZodFormattedErrors = z.ZodFormattedError<z.infer<typeof loginSchema>>;

type ErrorState = ZodFormattedErrors | string | null;

export default function LoginPage() {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors] = useState<ErrorState>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = { email, password };

    const result = loginSchema.safeParse(data);

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
      console.log(errors);
      return;
    }

    console.log("valid data: ", data);

    setErrors(null);

    const fetchResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (fetchResult?.error) {
      setErrors(fetchResult.error);
      return;
    }

    if (fetchResult?.ok) {
      router.push("/");
    }
  };

  const getFeildError = (
    fieldName: "email" | "password",
  ): string | undefined => {
    if (
      typeof errors === "object" &&
      errors !== null &&
      !Array.isArray(errors) &&
      fieldName in errors
    ) {
      const zodErrors = errors as ZodFormattedErrors;

      if (zodErrors[fieldName]?._errors?.[0]) {
        return zodErrors[fieldName]._errors[0];
      }
    }

    return undefined;
  };

  const hasGeneralError = typeof errors === "string" && errors;
  //   const getError = (fieldName: string) => {
  //     return errors?.[fieldName]?._errors?.[0];
  //   };

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
          Login
        </Typography>

        <TextField
          sx={{ width: 250 }}
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          error={!!getFeildError("email")}
          helperText={getFeildError("email")}
        />
        <TextField
          sx={{ width: 250 }}
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          error={!!getFeildError("password")}
          helperText={getFeildError("password")}
        />
        {hasGeneralError && (
          <Typography
            color="error"
            variant="body2"
            sx={{ mt: 1, textAlign: "center" }}
          >
            {errors}
          </Typography>
        )}
        <Button type="submit" variant="contained" size="large" sx={{}}>
          Login
        </Button>
        <Stack flexDirection={"row"} sx={{ justifyContent: "flex-end" }}>
          <Typography variant="body2" fontFamily="inherit">
            <Link href={"/register"}>Create a new account!</Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
