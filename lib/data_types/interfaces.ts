import { TAnswers } from "./types";

export interface IQuestion {
  isFavorite: boolean;
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
  id: string;
  questions: IQuestions;
  answers: TAnswers;
  questionsPointer: number;
  createdAt: any;
  timeRemaining: number;
  totalTime: number;
}

export interface IQuizContext {
  path: string;
  favoritesPath: string;
  historyPath: string;
  id: string;
  questions: IQuestions;
  answers: TAnswers;
  questionsPointer: number;
  timeRemaining: number;
  totalTime: number;
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

export interface IFavoriteQuestion {
  area: string;
  level: number;
  questionNumber: number;
  quiz: [string, string, string];
  option: [string, string];
  correct: number;
}

export interface IFavorite {
  questions: IFavoriteQuestion[];
}

export interface IHistory {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  area: string;
  level: number;
  points: number;
}
