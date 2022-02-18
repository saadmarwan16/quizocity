import { NextPage } from "next";
import MainQuiz from "../components/Home/MainQuiz";
import QuizControlsButton from "../components/Home/QuizControlsButton";
import QuizUserCompleted from "../components/Home/QuizUserCompleted";
import QuizQuestionsTime from "../components/Home/QuizQuestionsTime";
import Divider from "@mui/material/Divider";
import QuizNextQuestionButton from "../components/Home/QuizNextQuestionButton";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { IUserAnswers } from "../interfaces";
import getItem from "../data/getItem";
import { IQuestions } from "../interfaces";
import { QUESTIONS } from "../constants";

const Home: NextPage = () => {
  const [questionsPointer, setQuestionsPointer] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<IUserAnswers | null>(null);
  const [questions, setQuestions] = useState<IQuestions | null>(null);
  // let questions: IQuestions;
  useEffect(() => {
    const response = getItem(QUESTIONS);
    console.log(response);

    setQuestions(questions);
  });

  const handleQuestionChange = () => {
    setQuestionsPointer((state) => (state += 1));
  };

  // let userAnswers: IUserAnswers = {
  //   value: [null, null, null, null, null, null, null, null, null, null],
  // };

  return (
    <>
      <QuizUserCompleted />
      <Divider
        className="py-2"
        style={{ marginLeft: "-2rem", marginRight: "-2rem" }}
      />
      <QuizQuestionsTime questionNumber={questionsPointer} />
      {/* answers={userAnswers} */}
      {questions === null ? (
        <div>Loading</div>
      ) : (
        <MainQuiz
          question={questions!.quizlist[questionsPointer]}
          questionNumber={questionsPointer}
        />
      )}
      <div className="flex flex-wrap justify-center gap-2 py-6">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <QuizControlsButton
            onClick={() => setQuestionsPointer(() => num)}
            key={num}
          />
        ))}
      </div>

      {questionsPointer < 9 ? (
        <QuizNextQuestionButton handleQuestionChange={handleQuestionChange} />
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

export default Home;
