import { Typography } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { FunctionComponent, useContext } from "react";
import { firestore } from "../../lib/utils/firebaseInit";
import { QuizContext } from "../../pages/quiz/[[...slug]]";

interface QuizControlsButtonProps {
  clickedNum: number;
  isAnswered: boolean;
}

const QuizControlsButton: FunctionComponent<QuizControlsButtonProps> = ({
  clickedNum,
  isAnswered,
}) => {
  const { path } = useContext(QuizContext)!;

  return (
    <div 
    onClick={() => {
      const ref = doc(firestore, path);
      updateDoc(ref, {
        questionsPointer: clickedNum,
      })
    }}
    className={`${isAnswered ? 'bg-teal-700' : 'border-disabled'} px-4 py-2 rounded-3xl cursor-pointer`}
    >
      <Typography>{clickedNum}</Typography>
    </div>
  );
};

export default QuizControlsButton;
