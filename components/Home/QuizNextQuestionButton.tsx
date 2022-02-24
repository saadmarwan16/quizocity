import { Button } from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { QuestionsPointerContext } from "../../lib/data/providers";

const QuizNextQuestionButton: FunctionComponent = () => {
  const {questionsPointer, setQuestionsPointer} = useContext(QuestionsPointerContext)!;

  return (
    <div className="flex justify-end">
      <Button
        variant="contained"
        disableElevation
        color="secondary"
        onClick={() => setQuestionsPointer(questionsPointer + 1)}
      >
        Next question
      </Button>
    </div>
  );
};

export default QuizNextQuestionButton;
