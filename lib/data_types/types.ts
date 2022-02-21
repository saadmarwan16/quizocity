import { IQuestions } from "./interfaces";

export type IAnswer = string | null;

export type IAnswers = [
  IAnswer,
  IAnswer,
  IAnswer,
  IAnswer,
  IAnswer,
  IAnswer,
  IAnswer,
  IAnswer,
  IAnswer,
  IAnswer
];

export type QuestionsContextValue = {
  questions: IQuestions;
  setQuestions: (data: IQuestions) => void;
};

export type AnswersContextValue = {
  answers: IAnswers;
  setAnswers: (data: IAnswers) => void;
};

export type QuestionsPointerContextValue = {
  questionsPointer: number;
  setQuestionsPointer: (data: number) => void;
};
