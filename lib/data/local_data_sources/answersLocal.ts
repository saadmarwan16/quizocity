import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { ANSWERS } from "../../constants/quiz";
import { IAnswers } from "../../data_types/types";

export const getAnswersLocal = () => {
  const res = localStorage.getItem(ANSWERS);
  if (res === null || typeof res === "undefined") return null;

  return JSON.parse(res) as IAnswers;
};

export const setAnswersLocal = (
  data: IAnswers,
  setState: Dispatch<SetStateAction<IAnswers | null>>
) => {
  setState(data);
  localStorage.setItem(ANSWERS, JSON.stringify(data));
};

export const useAnswersLocal = (): [
  IAnswers | null,
  (data: IAnswers) => void
] => {
  const [answers, setAnswers] = useState<IAnswers | null>(null);
  const memoizedSetAnswers = useCallback(
    (data: IAnswers) => setAnswersLocal(data, setAnswers),
    []
  );

  return [answers, memoizedSetAnswers];
};
