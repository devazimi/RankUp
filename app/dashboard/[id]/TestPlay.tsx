"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Card,
  CardHeader,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import {
  Option,
  Question,
  TestProps,
  SelectedAnswers,
} from "@/app/types/testsType";

export default function TestPlay({ test }: TestProps) {
  const { data: session } = useSession();

  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers[]>([]);
  const [answerWithStatus, setAnswerWithStatus] = useState<
    Record<
      string,
      {
        optionId: string;
        isCorrect: boolean;
      }
    >
  >({});

  const handleSelectedAnswer = (
    questionId: string,
    optionId: string,
    text: string,
  ) => {
    const currentQuestion = test.questions.find((q) => q.id === questionId);
    const isCorrect = currentQuestion?.correctAnswer === optionId;

    setAnswerWithStatus((prev) => ({
      ...prev,
      [questionId]: {
        optionId,
        isCorrect,
      },
    }));

    setSelectedAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex(
        (a) => a.questionId === questionId,
      );

      if (existingAnswerIndex !== -1) {
        const updated = [...prev];
        updated[existingAnswerIndex] = {
          questionId,
          optionId,
          text,
          point: isCorrect ? 1 : 0,
        };
        return updated;
      } else {
        return [
          ...prev,
          { questionId, optionId, text, point: isCorrect ? 1 : 0 },
        ];
      }
    });
  };

  console.log(session?.user?.id)

  const saveTestResult = async () => {
    const totalScore = selectedAnswers.reduce(
      (sum, answer) => sum + answer.point,
      0,
    );

    try {
      const res = await fetch("/api/testResults", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testId: test.id,
          score: totalScore,
          totalQuestions: selectedAnswers.length,
          answers: { selectedAnswers },
        }),
      });

      if (!res) {
        throw new Error("no test result");
      }

      const testResult = await res.json();

      alert(`try ${testResult.attemptNumber}th added successfully. your pont is ${totalScore}/${test.questions.length}`)

      return testResult;

    } catch (err) {
      console.error("failed posting test result: ", err);
    }
  };

  const handleFinishTest = () => {
    console.log("test finished");
    const totalScore = selectedAnswers.reduce(
      (sum, answer) => sum + answer.point,
      0,
    );
    console.log(`points ${totalScore} of ${test.questions.length}`);
    saveTestResult();
  };

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
            // alignItems: 'center',
            boxSizing: "border-box",
          }}
        >
          <Stack direction={"column"} sx={{ mb: 10 }}>
            <Stack direction={"row"}>
              <Typography variant="h5" fontFamily={"monospace"} color="#4e72f7">
                {test.title} |
              </Typography>
              <Typography variant="h5" fontFamily={"monospace"} color="#9f0a0a">
                {test.difficulty}
              </Typography>
            </Stack>
            <Typography variant="h6" fontFamily={"monospace"}>
              {test.description}
            </Typography>
          </Stack>

          <Stack direction={"column"} spacing={5}>
            {test.questions.map((question: Question) => (
              <Card
                key={question.id}
                sx={{
                  minWidth: "100%",
                  background: "#02306206",
                  ":hover": {},
                }}
              >
                <CardHeader
                  title={
                    <Typography fontSize={18} fontFamily={"monospace"}>
                      {question.questionText}
                    </Typography>
                  }
                  subheader={
                    <Typography
                      fontSize={15}
                      fontFamily={"monospace"}
                      color="#717171"
                    >
                      {question.questionType}
                    </Typography>
                  }
                  fontFamily="monospace"
                />
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Stack spacing={1.5}>
                    {question.options.map((option: Option) => {
                      const answerStatus = answerWithStatus[question.id];
                      const isThisOptionSelected =
                        answerStatus?.optionId === option.id;
                      const isCorrect = answerStatus?.isCorrect;

                      let backgroundColor = "background.paper";
                      let borderColor = "divider";
                      let textColor = "text.primary";

                      if (isThisOptionSelected) {
                        backgroundColor = isCorrect ? "#4caf50" : "#f44336";
                        borderColor = isCorrect ? "#388e3c" : "#d32f2f";
                        textColor = "white";
                      }

                      return (
                        <Button
                          key={option.id}
                          onClick={() => {
                            handleSelectedAnswer(
                              question.id,
                              option.id,
                              option.text,
                            );
                          }}
                          variant="outlined"
                          fullWidth
                          sx={{
                            justifyContent: "flex-start",
                            textAlign: "left",
                            p: { xs: 1.5, sm: 2 },
                            borderRadius: 3,
                            textTransform: "none",
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            fontWeight: "normal",
                            // color: "text.primary",
                            color: textColor,
                            borderColor: borderColor,
                            backgroundColor: backgroundColor,
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              borderColor: "primary.main",
                              backgroundColor: isThisOptionSelected
                                ? backgroundColor
                                : "action.hover",
                              transform: "translateX(-4px)",
                              boxShadow: 1,
                            },
                            "&.Mui-selected": {
                              borderColor: "primary.main",
                              backgroundColor: "primary.light",
                              color: "primary.contrastText",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              width: "100%",
                            }}
                          >
                            <Box
                              sx={{
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                border: "2px solid",
                                borderColor: "divider",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.875rem",
                                fontWeight: "medium",
                                flexShrink: 0,
                              }}
                            >
                              {String.fromCharCode(
                                65 + question.options.indexOf(option),
                              )}
                            </Box>
                            <Typography variant="body1" sx={{ flex: 1 }}>
                              {option.text}
                            </Typography>
                          </Box>
                        </Button>
                      );
                    })}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
          <Button
            onClick={() => handleFinishTest()}
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
        </Box>
      ) : (
        <Typography>no user</Typography>
      )}
    </>
  );
}

// <Box component={"section"} sx={{ minWidth: "100%", height: "100vh" }}>
//   <Stack direction={"column"}>
//     <Typography>{test.title}</Typography>
//     <Typography>{test.description}</Typography>
//     <Typography>difficulity: {test.difficulty}</Typography>
//   </Stack>
//   <Stack direction={"column"} gap={4}>
//     {/* test questions */}
//     {test.questions.map((question: Question) => (
//       <Box key={question.id}>
//         <Stack direction={"column"}>
//           <Typography>{question.questionText}</Typography>
//           <Typography>{question.questionType}</Typography>

//           {/* question options */}
//           {question.options.map((option: Option) => (
//             <Box key={option.id}>
//               <Typography>{option.text}</Typography>
//               <Button
//                 onClick={() => {
//                   handleSelectedAnswer(
//                     question.id,
//                     option.id,
//                     option.text,
//                   );
//                 }}
//               >
//                 Select this
//               </Button>
//             </Box>
//           ))}
//         </Stack>
//       </Box>
// ))}
// </Stack>
// <Button onClick={() => handleFinishTest()}>Finish</Button>
// </Box>
