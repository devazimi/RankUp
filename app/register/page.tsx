"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      // if(password !== confirmPassword){
      //   return console.log('password in not corrent')
      // }

      if (!res.ok) {
        setError(data.error || "something went wrong @RegisterPage/try");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (error) {
      setError("Failed register @RegisterPage/catch");
    } finally {
      setLoading(false);
    }
  };

  if(loading) return <Typography>loading</Typography>

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
        onSubmit={handleSubmitForm}
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
        />
        <TextField
          sx={{ width: 250 }}
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ width: 250 }}
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          sx={{ width: 250 }}
          value={confirmPassword}
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" size="large" sx={{}}>
          Sign Up
        </Button>

        <Stack flexDirection={"row"} sx={{justifyContent: 'flex-end'}}>
          <Typography variant="body2" fontFamily="inherit">
            <Link href={"/login"}>Already have an account?</Link>
          </Typography>
        </Stack>
      </Box>  
    </Box>
  );
}
