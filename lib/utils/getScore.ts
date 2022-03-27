import { IQuestions } from "../data_types/interfaces";
import { TAnswers } from "../data_types/types";

const getScore = (questions: IQuestions, answers: TAnswers) => {
  let currentScore = 0;
  let currentCorrectAnswers = [];

  for (let i = 0; i < 10; i++) {
    const correctAnswerIndex = questions.quizlist[i].correct;
    const correctAnswer = questions.quizlist[i].option[correctAnswerIndex - 1];

    currentCorrectAnswers.push(correctAnswer);
    if (correctAnswer === answers[i]) currentScore += 1;
  }

  const points = currentScore - 2 * (10 - currentScore) + 3

  return { currentScore, currentCorrectAnswers, points };
};

export default getScore;
