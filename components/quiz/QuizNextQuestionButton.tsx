import { Button } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { FunctionComponent, useContext } from "react";
import { firestore, increment } from "../../lib/utils/firebaseInit";
import { QuizContext } from "../../pages/quiz/[[...slug]]";

const QuizNextQuestionButton: FunctionComponent = () => {
  const { path } = useContext(QuizContext)!;

  return (
    <Button
      variant="contained"
      disableElevation
      color="secondary"
      onClick={() => {
        const ref = doc(firestore, path);
        updateDoc(ref, {
          questionsPointer: increment(1),
        });
      }}
    >
      Next question
    </Button>
  );
};

export default QuizNextQuestionButton;
