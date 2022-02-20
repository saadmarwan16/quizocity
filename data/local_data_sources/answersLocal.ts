import { Dispatch, SetStateAction, useState } from "react";
import { ANSWERS } from "../../constants/quiz";
import { IAnswers } from "../../interfaces";

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

  return [answers, (data: IAnswers) => setAnswersLocal(data, setAnswers)];
};
