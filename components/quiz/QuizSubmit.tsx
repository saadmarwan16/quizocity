import { FunctionComponent, useContext } from "react";
import { Button, Typography } from "@mui/material";
import {
  QuizLocationContext,
  TimerContext,
} from "../../lib/data/providers";
import capitalize from "../../lib/utils/capitalize";
import { QuizContext } from "../../pages/quiz/[[...slug]]";

const QuizSubmit: FunctionComponent = () => {
  const { answers } = useContext(QuizContext)!;
  const { setQuizLocation } = useContext(QuizLocationContext)!;
  const timer = useContext(TimerContext);
  const percentageCompleted =
    answers.filter((answer) => answer !== null).length * 10;

  return (
    <div className="flex flex-col w-full p-4 sm:p-8 md:flex-row md:gap-6">
      <div className="flex items-center justify-center gap-8 mb-8 sm:gap-12 md:gap-16 md:flex-col md:basis-1/3">
        <div>
          <Typography className="text-sm md:text-base text-text-secondary">
            PERCENTAGE COMPLETE
          </Typography>
          <Typography className="text-3xl sm:text-5xl md:text-8xl">
            {percentageCompleted}%
          </Typography>
        </div>
        <div>
          <Typography className="text-sm md:text-base text-text-secondary">
            TIME REMAINING
          </Typography>
          <div className="flex items-end">
            <Typography className="text-3xl sm:text-5xl md:text-8xl">
              {timer}
            </Typography>
            <Typography className="pl-1 mb-1 text-sm md:text-lg text-text-disabled">
              seconds
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:basis-2/3">
        <div className="flex gap-8 px-3 py-2 rounded-lg bg-background-paper">
          <Typography className="md:basis-1/3 basis-1/2">
            Question Number
          </Typography>
          <Typography className="md:basis-1/3 basis-1/2">Answered?</Typography>
          <Typography className="hidden md:basis-1/3 sm:block">
            Answer
          </Typography>
        </div>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
          <div
            key={index}
            className="flex gap-8 px-3 py-2 rounded-lg bg-background-paper"
          >
            <Typography
              className="md:basis-1/3 basis-1/2"
              color="text.secondary"
            >
              {index + 1}
            </Typography>
            <Typography
              className="md:basis-1/3 basis-1/2"
              color="text.secondary"
            >
              {!!answers[index] ? "YES" : "NO"}
            </Typography>
            <Typography
              className="hidden md:basis-1/3 sm:block"
              color="text.secondary"
            >
              {!!answers[index] ? capitalize(answers[index]!) : "Null"}
            </Typography>
          </div>
        ))}
        <div className="flex justify-center gap-3 my-4 sm:gap-6 md:gap-10">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setQuizLocation("main")}
          >
            Go back
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setQuizLocation("complete")}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizSubmit;
