import { Dispatch, SetStateAction } from "react";

export interface IQuestion {
  correct: number;
  option: [string, string];
  quiz: [string, string, string];
}

export interface IQuestions {
  area: string;
  author: string;
  email: string;
  level: number;
  quizlist: IQuestion[];
}

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

export interface IQuiz {
  questions: {
    getQuestions: IQuestions;
    setQuestions: (data: IQuestions) => void;
  };
  answers: {
    getAnswers: IAnswers;
    setAnswers: (data: IAnswers) => void;
  };
  questionsPointer: {
    getQuestionsPointer: number;
    setQuestionsPointer: (data: number) => void;
  };
}
