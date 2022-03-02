import { FunctionComponent, useContext } from "react";
import MainQuiz from "./MainQuiz";
import QuizControlsButton from "./QuizControlsButton";
import QuizUserCompleted from "./QuizUserCompleted";
import QuizQuestionsTime from "./QuizQuestionsTime";
import Divider from "@mui/material/Divider";
import QuizNextQuestionButton from "./QuizNextQuestionButton";
import { Button } from "@mui/material";
import { AnswersContext, QuestionsPointerContext, QuizLocationContext } from "../../lib/data/providers";

const QuizBody: FunctionComponent = () => {
  const { questionsPointer } = useContext(QuestionsPointerContext)!;
  const {answers} = useContext(AnswersContext)!;
  const {setQuizLocation} = useContext(QuizLocationContext)!;

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
          <QuizControlsButton clickedNum={num} key={num} isAnswered={!!answers[num - 1]} />
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
                onClick={() => setQuizLocation('submit')}
              >
                Submit page
              </Button>
        </div>
      )}
    </>
  );
};

export default QuizBody;
