import { createContext } from "react";
import { IQuiz } from "../interfaces";

export const QuizContext = createContext<IQuiz | null>(null);