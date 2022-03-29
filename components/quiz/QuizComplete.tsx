import { Button, Typography } from "@mui/material";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter } from "next/router";
import { HOME, LEADERBOARD } from "../../lib/constants/routes";
import UserPoints from "../shared/UserPoints";
import { QuizContext } from "../../pages/quiz/[[...slug]]";
import getScore from "../../lib/utils/getScore";
import { firestore, serverTimestamp } from "../../lib/utils/firebaseInit";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  writeBatch,
} from "firebase/firestore";
import { IHistory } from "../../lib/data_types/interfaces";

interface QuizCompleteProps {}

const QuizComplete: FunctionComponent<QuizCompleteProps> = () => {
  const router = useRouter();
  const { questions, answers, path, historyPath } = useContext(QuizContext)!;
  const [score, setScore] = useState<number | null>(null);
  const [earnedPoints, setEarnedPoints] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  useEffect(() => {
    const { currentScore, currentCorrectAnswers, points } = getScore(
      questions,
      answers
    );

    setScore(currentScore);
    setCorrectAnswers(currentCorrectAnswers);
    setEarnedPoints(points);
  }, [answers, questions, questions.quizlist]);

  const saveQuizHistory = async () => {
    const ref = doc(firestore, path);
    const historyRef = collection(
      firestore,
      historyPath
    ) as CollectionReference<IHistory>;

    await deleteDoc(ref);
    await addDoc<IHistory>(historyRef, {
      createdAt: serverTimestamp(),
      area: questions.area,
      level: questions.level,
      points: earnedPoints,
    });
  };

  return (
    <div className="flex flex-col items-center w-full p-3 md:-6">
      <div className="mb-10">
        <UserPoints />
      </div>
      <div className="mb-10">
        <Typography variant="h5" className="font-bold text-center">
          {score && score < 4 && "Practise..."}
          {score && score >= 4 && score < 8 && "Improvement..."}
          {score && score >= 8 && "Wow..."}
        </Typography>
        <Typography className="text-text-secondary">
          {score &&
            score < 4 &&
            "Nobody gets it right on their first few attempts"}
          {score && score >= 4 && score < 8 && "There is always more room for improvement"}
          {score && score >= 8 && "That was breath-taking. Keep it up"}
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
            {earnedPoints === 0 && (
              <Typography
                className={0 < 0 ? "text-red-600" : "text-green-600"}
                variant="h4"
              >
                {earnedPoints}
              </Typography>
            )}
            {earnedPoints < 0 && (
              <Typography className="text-red-600" variant="h4">
                {earnedPoints}
              </Typography>
            )}
            {earnedPoints > 0 && (
              <Typography className="text-green-600" variant="h4">
                +{earnedPoints}
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-4 mb-10 sm:flex-row sm:gap-8">
        <Button
          variant="outlined"
          color="secondary"
          onClick={async () => {
            await saveQuizHistory();
            await router.push(HOME);
          }}
        >
          Go to Home
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={async () => {
            await saveQuizHistory();
            await router.push(LEADERBOARD);
          }}
        >
          See Leaderboard
        </Button>
      </div>
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
            </Typography>
            <div className="basis-1/5">
              {correctAnswers[index] === answers[index] ? (
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
