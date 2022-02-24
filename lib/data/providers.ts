import { createContext } from "react";
import {
  AnswersContextValue,
  QuestionsContextValue,
  QuestionsPointerContextValue,
  QuizLocationContextValue,
} from "../data_types/types";

export const QuestionsContext = createContext<QuestionsContextValue | null>(
  null
);

export const AnswersContext = createContext<AnswersContextValue | null>(null);

export const QuestionsPointerContext =
  createContext<QuestionsPointerContextValue | null>(null);

export const QuizLocationContext = createContext<QuizLocationContextValue | null>(null);
