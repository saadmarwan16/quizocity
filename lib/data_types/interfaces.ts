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
