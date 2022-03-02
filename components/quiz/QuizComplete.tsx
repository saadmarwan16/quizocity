import { Avatar, Button, Typography } from "@mui/material";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import router from "next/router";
import { HOME, LEADERBOARD } from "../../lib/constants/routes";
import {
  AnswersContext,
  QuestionsContext,
  QuizLocationContext,
} from "../../lib/data/providers";

interface QuizCompleteProps {}

const QuizComplete: FunctionComponent<QuizCompleteProps> = () => {
  const { setQuizLocation } = useContext(QuizLocationContext)!;
  const { questions } = useContext(QuestionsContext)!;
  const { answers } = useContext(AnswersContext)!;
  const [score, setScore] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  useEffect(() => {
    let currentScore = 0;
    let currentCorrectAnswers = [];

    for (let i = 0; i < 10; i++) {
      const correctAnswerIndex = questions.quizlist[i].correct;
      const correctAnswer =
        questions.quizlist[i].option[correctAnswerIndex - 1];

      currentCorrectAnswers.push(correctAnswer);
      if (correctAnswer === answers[i]) currentScore += 1;
    }

    setScore(currentScore);
    setCorrectAnswers(currentCorrectAnswers);
  }, [answers, questions.quizlist]);

  return (
    <div className="flex flex-col items-center w-full p-3 md:-6">
      <div className="mb-10">
        <Avatar
          alt="profile"
          src="/person.png"
          className="mb-4 w-36 h-36 sm:w-44 sm:h-44"
        />
        <Typography className="mb-2 font-bold" variant="h6">
          Anonymous User
        </Typography>
        <div className="flex items-center justify-center gap-2">
          <div className="inline-flex items-center justify-center bg-teal-700 w-9 h-9 rounded-3xl">
            <StarIcon className="w-5 h-5" />
          </div>
          <Typography variant="h6" component="p" color="primary">
            300
          </Typography>
        </div>
      </div>
      <div className="mb-10">
        <Typography variant="h5" className="font-bold text-center">
          Wow...
        </Typography>
        <Typography className="text-text-secondary">
          That was breath-taking. Keep it up
        </Typography>
      </div>
      <div className="flex flex-col gap-4 mb-10 md:gap-24 sm:flex-row">
        <div className="flex flex-col items-center">
          <Typography className="text-text-disabled">YOUR SCORE</Typography>
          <div className="flex gap-3">
            <Typography color="primary" variant="h4">
              {score}
            </Typography>
            <Typography color="text.primary" variant="h4">
              / 10
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Typography className="text-text-disabled">EARNED POINTS</Typography>
          <div className="flex gap-3">
            <div className="inline-flex items-center justify-center bg-teal-700 w-9 h-9 rounded-3xl">
              <StarIcon className="w-5 h-5" />
            </div>
            <Typography color="error" variant="h4">
              -15
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-4 mb-10 sm:flex-row sm:gap-8">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            localStorage.clear();
            router.push(HOME);
          }}
        >
          Go to Home
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            localStorage.clear();
            router.push(LEADERBOARD);
          }}
        >
          See Leaderboard
        </Button>
      </div>
      {/* <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setQuizLocation("main");
        }}
      >
        Go back
      </Button> */}
      <div className="flex flex-col w-full gap-3 sm:w-5/6 md:w-3/4">
        <Typography className="font-bold" variant="h6">
          Results Details
        </Typography>
        <div className="flex gap-8 px-3 py-2 rounded-lg bg-background-paper">
          <Typography className="basis-2/5" color="text.secondary">
            Answer
          </Typography>
          <Typography
            className="truncate basis-2/5 text-ellipsis"
            color="text.secondary"
          >
            Correct
          </Typography>
          <Typography className="basis-1/5" color="text.secondary">
            Results
          </Typography>
        </div>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
          <div
            key={index}
            className="flex gap-8 px-3 py-2 rounded-lg bg-background-paper"
          >
            <Typography
              className="truncate basis-2/5 text-ellipsis"
              color="text.secondary"
            >
              {!!answers[index] ? answers[index] : "Null"}
            </Typography>
            <Typography
              className="truncate basis-2/5 text-ellipsis"
              color="text.secondary"
            >
              {correctAnswers[index]}
              {/* {correctAnswer} */}
            </Typography>
            <div className="basis-1/5">
              {correctAnswers[index] === answers[index] ? (
                // {correctAnswer === answers[index] ? (
                <CheckIcon className="text-green-400" />
              ) : (
                <ClearIcon className="text-red-600" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizComplete;