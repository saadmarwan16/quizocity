import { IAnswers, IQuestions } from "./interfaces";

export const questions: IQuestions = {
  area: "sat",
  author: "twinword inc.",
  email: "help@twinword.com",
  level: 3,
  quizlist: [
    {
      correct: 2,
      option: ["jury", "assess"],
      quiz: ["value", "estimate", "evaluate"],
    },
    {
      correct: 2,
      option: ["trace", "adjacent"],
      quiz: ["close", "near", "next"],
    },
    {
      correct: 2,
      option: ["mad", "exotic"],
      quiz: ["foreign", "national", "ethnic"],
    },
    {
      correct: 1,
      option: ["forecast", "sustainable"],
      quiz: ["assume", "insight", "weather"],
    },
    {
      correct: 2,
      option: ["charity", "rapid"],
      quiz: ["fast", "quick", "prompt"],
    },
    {
      correct: 2,
      option: ["par", "intermediate"],
      quiz: ["center", "middle", "average"],
    },
    {
      correct: 1,
      option: ["vendor", "adjust"],
      quiz: ["seller", "employee", "merchant"],
    },
    {
      correct: 2,
      option: ["banking", "thesis"],
      quiz: ["college", "degree", "learning"],
    },
    {
      correct: 2,
      option: ["compile", "bass"],
      quiz: ["fishing", "guitar", "sea"],
    },
    {
      correct: 1,
      option: ["transparent", "differently"],
      quiz: ["clear", "liquid", "plain"],
    },
  ],
};

export const initialAnswers: IAnswers = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];
