import Button from "@mui/material/Button";
import { FunctionComponent, useContext } from "react";
import { QuestionsPointerContext } from "../../lib/data/providers";

interface QuizControlsButtonProps {
  clickedNum: number;
}

const QuizControlsButton: FunctionComponent<QuizControlsButtonProps> = ({
  clickedNum,
}) => {
  const { setQuestionsPointer } = useContext(QuestionsPointerContext)!;

  return (
    <Button
      variant="contained"
      disableElevation
      style={{
        minWidth: 20,
        minHeight: 20,
        padding: 0,
        backgroundColor: "#ffffff80",
      }}
      onClick={() => setQuestionsPointer(clickedNum)}
    />
  );
};

export default QuizControlsButton;
