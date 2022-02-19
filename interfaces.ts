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

export interface IAnswers {
  value: [
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
}

export interface IQuiz {
  questions: {
    getQuestions: IQuestions,
    setQuestions: (val: string | ((prevState: string) => string)) => void,
  };
  answers: {
    getAnswers: IAnswers,
    setAnswers: (val: string | ((prevState: string) => string)) => void,
  };
  questionsPointer: {
    getQuestionsPointer: number,
    setQuestionsPointer: (val: string | ((prevState: string) => string)) => void,
  };
}
