import { Dispatch, SetStateAction, useState } from "react";
import { QUESTIONS_POINTER } from "../../constants/quiz";

export const getQuestionsPointerLocal = () => {
  const res = localStorage.getItem(QUESTIONS_POINTER);
  if (res === null || typeof res === "undefined") return null;

  return JSON.parse(res) as number;
};

export const setQuestionsPointerLocal = (
  data: number,
  setState: Dispatch<SetStateAction<number | null>>
) => {
  setState(data);
  localStorage.setItem(QUESTIONS_POINTER, JSON.stringify(data));
};

export const useQuestionPointerLocal = (): [
  number | null,
  (data: number) => void
] => {
  const [questionsPointer, setQuestionsPointer] = useState<number | null>(null);

  return [
    questionsPointer,
    (data: number) => setQuestionsPointerLocal(data, setQuestionsPointer),
  ];
};
