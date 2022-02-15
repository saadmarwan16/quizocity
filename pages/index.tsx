import type { NextPage } from "next";
import Head from "next/head";
import Button from "@mui/material/Button";
import MainQuiz from "../components/Home/MainQuiz";
import QuizControlButtons from "../components/Home/QuizControlButtons";
import QuizUserCompleted from "../components/Home/QuizUserCompleted";
import QuizQuestionsTime from "../components/Home/QuizQuestionsTime";
import Divider from "@mui/material/Divider";
import { Quiz } from "@mui/icons-material";
import QuizNextQuestionButton from "../components/Home/QuizNextQuestionButton";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | Quizocity</title>
        <meta name="description" content="Customized Word Association Quiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center w-screen min-h-screen p-0 bg-black md:p-10">
        <div className="flex flex-col justify-center w-full min-h-screen p-8 mx-auto md:w-4/5 bg-background-paper rounded-xl md:min-h-fit">
          <QuizUserCompleted />
          <Divider
            className="py-2"
            style={{ marginLeft: "-2rem", marginRight: "-2rem" }}
          />
          <QuizQuestionsTime />
          <MainQuiz />
          <QuizControlButtons />
          <QuizNextQuestionButton />
        </div>
      </div>
    </>
  );
};

export default Home;
