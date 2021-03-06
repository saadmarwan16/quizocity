import { CircularProgress, Typography } from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { TimerContext } from "../../lib/data/providers";
import durationToMMSS from "../../lib/utils/durationToMMSS";
import { QuizContext } from "../../pages/quiz/[[...slug]]";

const QuizQuestionsTime: FunctionComponent = () => {
  const { questionsPointer, totalTime } = useContext(QuizContext)!;
  const timer = useContext(TimerContext);

  return (
    <div className="flex flex-col justify-between mt-8 sm:mt-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2">
        <Typography className="pr-2 text-text-disabled">Questions</Typography>
        <div className="flex items-center gap-1">
          <Typography variant="h4" component="p">
            {questionsPointer}
          </Typography>
          <Typography variant="h5" component="p" color="text.secondary">
            /
          </Typography>
          <Typography variant="body2" component="p" color="text.disabled">
            10
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center">
          <Typography className="text-text-disabled">TIME REMAINING</Typography>
          <Typography className="text-sm text-text-disabled">
            (MM:SS)
          </Typography>
        </div>
        <div className="relative inline-flex">
          <CircularProgress
            variant="determinate"
            value={(timer / totalTime) * 100}
            style={{ width: 60, height: 60 }}
          />
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <Typography>{durationToMMSS(timer)}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestionsTime;
