"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Button, Stack, Typography, Snackbar, Alert } from "@mui/material";
import { Question, TestProps } from "@/app/types/testsType";

import { useTestLogic } from "@/hooks/useTestLogic";
import QuestionCard from "./QuestionCard";
import TestHeader from "./TestHeader";

export default function TestPlay({ test }: TestProps) {
  const { data: session } = useSession();

  const router = useRouter();

  const {
    handleSelectedAnswer,
    answerWithStatus,
    handleFinish,
    finished,
    snackbar,
    setSnackbar,
  } = useTestLogic(test);

  return (
    <>
      {session ? (
        <Box
          component={"section"}
          sx={{
            minWidth: "100%",
            minHeight: "100vh",
            px: {
              xs: "5%",
              sm: "15%",
              md: "30%",
            },
            my: "50px",
            display: "flex",
            flexDirection: "column",
            mx: "auto",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          <TestHeader test={test} />

          <Stack direction={"column"} spacing={5}>
            {test.questions.map((question: Question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onSelect={handleSelectedAnswer}
                answerStatus={answerWithStatus}
                disabled={finished}
              />
            ))}
          </Stack>

          {!finished && (
            <Button
              onClick={() => {
                handleFinish();
                router.push("/dashboard");
                router.refresh();
              }}
              variant="contained"
              sx={{
                my: 5,
                width: "50%",
                height: 50,
                mx: "auto",
              }}
            >
              Finish
            </Button>
          )}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
              severity={snackbar.severity}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      ) : (
        <Typography>no user</Typography>
      )}
    </>
  );
}
