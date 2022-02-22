import { CircularProgress, Typography } from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { QuestionsPointerContext } from "../../lib/data/providers";

const QuizQuestionsTime: FunctionComponent = () => {
  const { questionsPointer } = useContext(QuestionsPointerContext)!;

  return (
    <div className="flex flex-col justify-between mt-8 sm:mt-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2">
        <Typography className="pr-2 text-text-disabled">Questions</Typography>
        <div className="flex items-center gap-1">
          <Typography variant="h4" component="p" color="text.primary">
            {questionsPointer + 1}
          </Typography>
          <Typography variant="h5" component="p" color="text.secondary">/</Typography>
          <Typography variant="body2" component="p" color="text.disabled">
            10
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Typography className="text-text-disabled">TIME REMAINING</Typography>
        <div className="relative inline-flex">
          <CircularProgress variant="determinate" value={30} />
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <Typography className="text-text-primary">30</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestionsTime;
