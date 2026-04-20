"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  Option,
  Question,
  TestProps,
  SelectedAnswers,
} from "@/app/types/testsType";

export default function TestPlay({ test }: TestProps) {
  const { data: session } = useSession();

  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers[]>([]);

  const handleSelectedAnswer = (
    questionId: string,
    optionId: string,
    text: string,
  ) => {
    const currentQuestion = test.questions.find((q) => q.id === questionId);
    const isCorrect = currentQuestion?.correctAnswer === optionId;

    // if (isCorrect) {
    //   console.log("currect");
    // } else {
    //   console.log("not correct");
    // }

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

  const saveTestResult = async() => {
    const totalScore = selectedAnswers.reduce((sum, answer) => sum + answer.point, 0);

    try{
      const res = await fetch('/api/testResults', {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({testId: test.id, score: totalScore, totalQuestions: selectedAnswers.length, answers: {selectedAnswers}})
      });

      if(!res){
        throw new Error('no test result');
      }

      const testResult = await res.json();

      return testResult;
    }catch(err){
      console.error('failed posting test result: ',err);
    }
  }

  const handleFinishTest = () => {
    console.log("test finished");
    // const points = selectedAnswers.filter((p)=> p.point === 1);
    // const pointsLength = points.length;
    const totalScore = selectedAnswers.reduce(
      (sum, answer) => sum + answer.point,
      0,
    );
    console.log(`points ${totalScore} of ${test.questions.length}`);
    saveTestResult();

  };

  

  // console.log("selected answers: ", selectedAnswers);

  return (
    <>
      {session ? (
        <Box component={"section"} sx={{ minWidth: "100%", height: "100vh" }}>
          <Stack direction={"column"}>
            <Typography>{test.title}</Typography>
            <Typography>{test.description}</Typography>
            <Typography>difficulity: {test.difficulty}</Typography>
          </Stack>
          <Stack direction={"column"} gap={4}>
            {/* test questions */}
            {test.questions.map((question: Question) => (
              <Box key={question.id}>
                <Stack direction={"column"}>
                  <Typography>{question.questionText}</Typography>
                  <Typography>{question.questionType}</Typography>

                  {/* question options */}
                  {question.options.map((option: Option) => (
                    <Box key={option.id}>
                      <Typography>{option.text}</Typography>
                      <Button
                        onClick={() => {
                          handleSelectedAnswer(
                            question.id,
                            option.id,
                            option.text,
                          );
                        }}
                      >
                        Select this
                      </Button>
                    </Box>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
          <Button onClick={() => handleFinishTest()}>Finish</Button>
        </Box>
      ) : <Typography>no user</Typography>}
    </>
  );
}
