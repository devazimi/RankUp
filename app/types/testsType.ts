export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  testId: string;
  questionText: string;
  questionType: string;
  options: Option[];
  correctAnswer: string;
}

export default interface Test {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  duration: any;
  id: string;
  title: string;
  description: string;
  difficulty: string;
  questions: Question[];
}

export type Params = {
  params: Promise<{
    id: string;
  }>;
};

export type TestProps = {
  test: Test;
};

export interface SelectedAnswers {
  questionId: string;
  optionId: string;
  text: string;
  point: number;
}

export interface OptionButtonProps {
  option: Option;
  question: Question;
  isSelected: boolean;
  isCorrect: boolean | null;
  disabled: boolean;
  onSelect: (questionId: string, optionId: string, text: string) => void;
}

export interface TestHeaderProps{
  test: Test;
}
