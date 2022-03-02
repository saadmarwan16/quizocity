import { Typography } from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { QuestionsPointerContext } from "../../lib/data/providers";

interface QuizControlsButtonProps {
  clickedNum: number;
  isAnswered: boolean;
}

const QuizControlsButton: FunctionComponent<QuizControlsButtonProps> = ({
  clickedNum,
  isAnswered,
}) => {
  const { setQuestionsPointer } = useContext(QuestionsPointerContext)!;

  return (
    <div 
    onClick={() => setQuestionsPointer(clickedNum)}
    className={`${isAnswered ? 'bg-teal-700' : 'border-disabled'} px-4 py-2 rounded-3xl cursor-pointer`}
    >
      <Typography>{clickedNum}</Typography>
    </div>
  );
};

export default QuizControlsButton;
