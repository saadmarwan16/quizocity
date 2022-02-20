import { Button } from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { QuizContext } from "../../data/providers";

const QuizNextQuestionButton: FunctionComponent = () => {
  const {questionsPointer: { getQuestionsPointer, setQuestionsPointer }} = useContext(QuizContext)!;

  const handleNextClick = (currentPage: number): string => {
    return (currentPage + 1).toString();
  }

  return (
    <div className="flex justify-end">
      <Button
        variant="contained"
        disableElevation
        color="secondary"
        style={{ textTransform: "none", backgroundColor: "#d500f9" }}
        onClick={() => setQuestionsPointer(getQuestionsPointer + 1)}
      >
        Next question
      </Button>
    </div>
  );
};

export default QuizNextQuestionButton;
