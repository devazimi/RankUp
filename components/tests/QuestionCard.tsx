import { Question, Option } from "@/app/types/testsType";

import {
  Stack,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import OptionButton from "./OptionButton";

export interface QuestionCardProps {
  question: Question;
  onSelect: (questionId: string, optionId: string, text: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answerStatus: any;
  disabled: boolean;
}

export default function QuestionCard({
  question,
  onSelect,
  answerStatus,
  disabled
}: QuestionCardProps) {
  return (
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
          <Typography fontSize={15} fontFamily={"monospace"} color="#717171">
            {question.questionType}
          </Typography>
        }
        fontFamily="monospace"
      />
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={1.5}>
          {question.options.map((option: Option) => {
            const answerwithStatus = answerStatus[question.id];
            const isSelected = answerwithStatus?.optionId === option.id;
            const isCorrect = answerwithStatus?.isCorrect;

            return (
              <OptionButton
                key={option.id}
                option={option}
                question={question}
                isSelected={isSelected}
                onSelect={onSelect}
                isCorrect={isCorrect}
                disabled={disabled}
              />
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}
