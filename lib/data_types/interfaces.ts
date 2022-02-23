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
