import { IQuestions } from "./interfaces";

export type TAnswer = string | null;

export type TAnswers = [
  TAnswer,
  TAnswer,
  TAnswer,
  TAnswer,
  TAnswer,
  TAnswer,
  TAnswer,
  TAnswer,
  TAnswer,
  TAnswer
];

export type QuestionsContextValue = {
  questions: IQuestions;
  setQuestions: (data: IQuestions) => void;
};

export type AnswersContextValue = {
  answers: TAnswers;
  setAnswers: (data: TAnswers) => void;
};

export type QuestionsPointerContextValue = {
  questionsPointer: number;
  setQuestionsPointer: (data: number) => void;
};

export type QuizLocationContextValue = {
  quizLocation: string | null;
  setQuizLocation: (data: string) => void;
}
