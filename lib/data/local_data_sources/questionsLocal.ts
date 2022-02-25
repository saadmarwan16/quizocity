import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { QUESTIONS } from "../../constants/quiz";
import { IQuestions } from "../../data_types/interfaces";

export const getQuestionsLocal = () => {
  const res = localStorage.getItem(QUESTIONS);
  if (res === null || typeof res === "undefined") return null;

  return JSON.parse(res) as IQuestions;
};

export const setQuestionsLocal = (
  data: IQuestions,
  setState: Dispatch<SetStateAction<IQuestions | null>>
) => {
  setState(data);
  localStorage.setItem(QUESTIONS, JSON.stringify(data));
};

export const useQuestionsLocal = (): [
  IQuestions | null,
  (data: IQuestions) => void
] => {
  const [questions, setQuestions] = useState<IQuestions | null>(null);
  const memoizedSetQuestions = useCallback(
    (data: IQuestions) => setQuestionsLocal(data, setQuestions),
    []
  );

  return [
    questions,
    memoizedSetQuestions,
  ];
};
