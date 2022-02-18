import { IQuestions } from "../interfaces";

const getItem = (key: string): IQuestions | null => {
  const response = localStorage.getItem(key);

  if (response == null) return null;

  console.log(response);
  console.log(typeof response)

  return JSON.parse(response);
};

export default getItem;
