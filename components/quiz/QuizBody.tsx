import { FunctionComponent, useContext } from "react";
import MainQuiz from "./MainQuiz";
import QuizControlsButton from "./QuizControlsButton";
import QuizUserCompleted from "./QuizUserCompleted";
import QuizQuestionsTime from "./QuizQuestionsTime";
import Divider from "@mui/material/Divider";
import QuizNextQuestionButton from "./QuizNextQuestionButton";
import { Button, Typography } from "@mui/material";
import { QuizLocationContext } from "../../lib/data/providers";
import { QuizContext } from "../../pages/quiz/[[...slug]]";

const QuizBody: FunctionComponent = () => {
  const { questions: {author, email}, questionsPointer, answers } = useContext(QuizContext)!;
  const { setQuizLocation } = useContext(QuizLocationContext)!;

  return (
    <>
      <QuizUserCompleted />
      <Divider
        className="py-2"
        style={{ marginLeft: "-2rem", marginRight: "-2rem" }}
      />
      <QuizQuestionsTime />
      <MainQuiz />
      <div className="flex flex-wrap justify-center gap-2 py-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <QuizControlsButton
            clickedNum={num}
            key={num}
            isAnswered={!!answers[num - 1]}
          />
        ))}
      </div>

      {questionsPointer < 10 ? (
        <QuizNextQuestionButton />
      ) : (
        <div className="flex justify-end">
          <Button
            variant="contained"
            disableElevation
            color="secondary"
            onClick={() => setQuizLocation("submit")}
          >
            Submit page
          </Button>
        </div>
      )}
      <div className="flex flex-col items-end mt-6">
        <Typography variant="caption" color="text.disabled">author: {author}</Typography>
        <Typography variant="caption" color="text.disabled">email: {email}</Typography>
      </div>
    </>
  );
};

export default QuizBody;
