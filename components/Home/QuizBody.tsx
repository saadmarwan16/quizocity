import { FunctionComponent, useContext } from "react";
import MainQuiz from "../../components/Home/MainQuiz";
import QuizControlsButton from "../../components/Home/QuizControlsButton";
import QuizUserCompleted from "../../components/Home/QuizUserCompleted";
import QuizQuestionsTime from "../../components/Home/QuizQuestionsTime";
import Divider from "@mui/material/Divider";
import QuizNextQuestionButton from "../../components/Home/QuizNextQuestionButton";
import { Button } from "@mui/material";
import Link from "next/link";
import { QuestionsPointerContext } from "../../data/providers";

const QuizBody: FunctionComponent = () => {
  const { questionsPointer } = useContext(QuestionsPointerContext)!;

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
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <QuizControlsButton clickedNum={num} key={num} />
        ))}
      </div>

      {questionsPointer < 9 ? (
        <QuizNextQuestionButton />
      ) : (
        <div className="flex justify-end">
          <Link href="/submit">
            <a>
              <Button
                variant="contained"
                disableElevation
                color="secondary"
                style={{
                  textTransform: "none",
                  backgroundColor: "#d500f9",
                }}
              >
                Submit page
              </Button>
            </a>
          </Link>
        </div>
      )}
    </>
  );
};

export default QuizBody;
