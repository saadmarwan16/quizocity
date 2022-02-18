import { Button } from "@mui/material";
import { FunctionComponent } from "react";

interface QuizNextQuestionButtonProps {
  handleQuestionChange: () => void;
}

const QuizNextQuestionButton: FunctionComponent<
  QuizNextQuestionButtonProps
> = ({ handleQuestionChange }) => {
  return (
    <div className="flex justify-end">
      <Button
        variant="contained"
        disableElevation
        color="secondary"
        style={{ textTransform: "none", backgroundColor: "#d500f9" }}
        onClick={() => handleQuestionChange()}
      >
        Next question
      </Button>
    </div>
  );
};

export default QuizNextQuestionButton;
