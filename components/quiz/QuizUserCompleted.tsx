import {
  Avatar,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { useAuthContext } from "../../lib/data/contexts/AuthContext";
import { QuizContext } from "../../pages/quiz/[[...slug]]";

const QuizUserCompleted: FunctionComponent = () => {
  const { answers } = useContext(QuizContext)!;
  const {
    authState: [user],
  } = useAuthContext();
  const percentageCompleted =
    answers.filter((answer) => answer !== null).length * 10;

  return (
    <div className="flex flex-col justify-between gap-3 sm:flex-row md:gap-0">
      <div className="flex items-center gap-3">
        <Avatar
          src={user?.photoURL ?? "/person.png"}
          sx={{ width: 56, height: 56 }}
        />
        <Typography>
          {user?.displayName?.toUpperCase() ?? "Anonymous User"}
        </Typography>
      </div>
      <div className="flex flex-col gap-2">
        <Typography>Total Test: {percentageCompleted}% completed</Typography>
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
