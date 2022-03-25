import { createContext, FunctionComponent, useContext } from "react";
import { IQuestions, IQuiz } from "../../data_types/interfaces";
import { TAnswers } from "../../data_types/types";
import { useAuthContext } from "./AuthContext";
import {
  useDocumentData,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import { firestore } from "../../utils/firebaseInit";
import { doc, DocumentReference } from "firebase/firestore";

interface IQuizContext {
  questions: IQuestions | undefined;
  answers: TAnswers | undefined;
  questionsPointer: number | undefined;
}

const QuizContext = createContext<IQuizContext | null>(null);

export const useQuiz = () => useContext(QuizContext);

const QuizContextProvider: FunctionComponent = ({ children }) => {
  const {
    authState: [user],
  } = useAuthContext();
  const questionIdRef = doc(firestore, `users/currentQuizId`);
  const [questionId] = useDocumentOnce(questionIdRef);
  const quizRef = doc(
    firestore,
    `users/${user?.uid}/questions/${questionId?.data()}`
  ) as DocumentReference<IQuiz>;
  const [snapshot, loading, error] = useDocumentData<IQuiz>(quizRef);

  const value = {
    questions: snapshot?.questions,
    answers: snapshot?.answers,
    questionsPointer: snapshot?.questionsPointer,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export default QuizContextProvider;
