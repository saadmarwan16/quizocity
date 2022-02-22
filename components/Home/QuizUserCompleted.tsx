import {
  Avatar,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { AnswersContext } from "../../lib/data/providers";

const QuizUserCompleted: FunctionComponent = () => {
  const {answers} = useContext(AnswersContext)!;
  const percentageCompleted =  answers.filter(answer => answer !== null).length * 10;
  
  return (
    <div className="flex flex-col justify-between gap-3 sm:flex-row md:gap-0">
      <div className="flex items-center gap-3">
        <Avatar src="/person.png" sx={{ width: 56, height: 56 }} />
        <Typography className="text-text-primary">Anonymous User</Typography>
      </div>
      <div className="flex flex-col gap-2">
        <Typography className="text-text-primary">
          Total Test: {percentageCompleted}% completed
        </Typography>
        <LinearProgress
          variant="determinate"
          value={percentageCompleted}
          color="secondary"
          sx={{
            height: 5,
            borderRadius: 5,
            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 5,
            },
          }}
        />
      </div>
    </div>
  );
};

export default QuizUserCompleted;
