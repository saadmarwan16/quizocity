import { Button } from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { QuizLocationContext } from "../../lib/data/providers";

interface QuizCompleteProps {}

const QuizComplete: FunctionComponent<QuizCompleteProps> = () => {
    const { setQuizLocation } = useContext(QuizLocationContext)!;

  return (<div>
      <p>Quiz Complete</p>
      <Button variant="contained" color="secondary" onClick={() => setQuizLocation("submit")}>Go back</Button>
  </div>);
};

export default QuizComplete;
