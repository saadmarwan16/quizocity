import { Dispatch, SetStateAction, useState } from "react";
import { QUIZ_LOCATION } from "../../constants/quiz";

export const getQuizLocationLocal = () => {
  if (typeof localStorage === "undefined") return null;
  const res = localStorage.getItem(QUIZ_LOCATION);
  if (res === null || typeof res === "undefined") return null;

  return res;
};

export const setQuizLocationLocal = (
  data: string,
  setState: Dispatch<SetStateAction<string | null>>
) => {
  setState(data);
  localStorage.setItem(QUIZ_LOCATION, data);
};

export const useQuizLocationLocal = (): [
  string | null,
  (data: string) => void
] => {
  const [quizLocation, setQuizLocation] = useState<string | null>(
    getQuizLocationLocal()
  );

  return [
    quizLocation,
    (data: string) => setQuizLocationLocal(data, setQuizLocation),
  ];
};
