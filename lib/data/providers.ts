import { createContext } from "react";
import { IQuestions } from "../data_types/interfaces";
import {
  AnswersContextValue,
  QuestionsContextValue,
  QuestionsPointerContextValue,
} from "../data_types/types";

export const QuestionsContext = createContext<QuestionsContextValue | null>(
  null
);

export const AnswersContext = createContext<AnswersContextValue | null>(null);

export const QuestionsPointerContext =
  createContext<QuestionsPointerContextValue | null>(null);
