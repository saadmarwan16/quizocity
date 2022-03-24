import { TAnswers } from "./types";

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

export interface IQuiz {
  questions: IQuestions;
  answers: TAnswers;
  questionsPointer: number;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ISignupInput {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export interface IForgotPasswordInput {
  email: string;
}

export interface IResetPasswordInput {
  password: string;
  confirm: string;
}

export interface ILeaderboard {
  uid: string;
  displayName: string;
  photoURL?: string;
  points: number;
}
