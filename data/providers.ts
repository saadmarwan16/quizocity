import { createContext } from "react";
import { IQuestions, IQuiz } from "../interfaces";

export const QuizContext = createContext<IQuestions | null>(null);