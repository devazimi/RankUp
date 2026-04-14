export interface Option {
    id: string,
    text: string,
}

export interface Question {
    id: string,
    testId: string,
    questionText: string,
    questionType: string,
    options: Option[],
    correctAnswer: string,
}

export default interface Test {
    id: string,
    title: string,
    description: string,
    difficulty: string,
    questions: Question[],
}

export interface FakeItem{
    message: string,
}
