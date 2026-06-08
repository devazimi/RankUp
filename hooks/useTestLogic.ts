import { useState } from "react";
import { TestProps } from "@/app/types/testsType";
import { SelectedAnswers } from "@/app/types/testsType";

export const useTestLogic = (test: TestProps["test"]) => {
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
  const [finished, setFinished] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

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

  const handleFinish = async () => {
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

      setSnackbar({
        open: true,
        message: "result saved successfully!",
        severity: "success",
      });

      setFinished(true);
      return testResult;
    } catch (err) {
      console.error("failed posting test result: ", err);
      setSnackbar({open: true, message: 'error in recording the result', severity: 'error'});
    }
  };

  const handleFinishTest = () => {
    console.log("test finished");
    const totalScore = selectedAnswers.reduce(
      (sum, answer) => sum + answer.point,
      0,
    );
    console.log(`points ${totalScore} of ${test.questions.length}`);
    handleFinish();
  };

  return{
    selectedAnswers,
    answerWithStatus,
    snackbar,
    finished,
    setSnackbar,
    handleSelectedAnswer,
    handleFinish,
    handleFinishTest
  }
};
