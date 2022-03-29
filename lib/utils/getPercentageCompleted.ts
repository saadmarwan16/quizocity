import { TAnswers } from "../data_types/types";

const getPercentageCompleted = (answers: TAnswers) => {
  return answers.filter((answer) => answer !== null).length * 10;
};

export default getPercentageCompleted;
