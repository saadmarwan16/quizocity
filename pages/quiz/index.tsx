import { NextPage } from "next";
import MainQuiz from "../../components/Home/MainQuiz";
import QuizControlsButton from "../../components/Home/QuizControlsButton";
import QuizUserCompleted from "../../components/Home/QuizUserCompleted";
import QuizQuestionsTime from "../../components/Home/QuizQuestionsTime";
import Divider from "@mui/material/Divider";
import QuizNextQuestionButton from "../../components/Home/QuizNextQuestionButton";
import { useState, createContext } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { IUserAnswers } from "../../interfaces";
import { IQuestions } from "../../interfaces";
import { ANSWERS, QUESTIONS, QUESTIONS_POINTER } from "../../constants/quiz";
import { usePagination, useLocalStorageValue } from '@mantine/hooks';
import useFetch from "react-fetch-hook";
import useSWR, { Key } from "swr";
import useIQuestionsPointerLocal from "../../data/custom_hooks/useIQuestionsPointerLocal";
import useIQuestionsLocal from "../../data/custom_hooks/useIQuestionsLocal";

const QuizContext = createContext<IQuestions | undefined>(undefined);

const QuizHome: NextPage = () => {
  // const [userAnswers, setUserAnswers] = useState<IUserAnswers | null>(null);
  // const [answers, setAnswers] = useLocalStorageValue({key: ANSWERS});
  // const [questions, setQuestions] = useLocalStorageValue({key: QUESTIONS});
  const [questions, setQuestions] = useIQuestionsLocal();
  const [questionsPointer, setQuestionsPointer] = useIQuestionsPointerLocal();
  const { active } = usePagination({ total: 10, page: questionsPointer });

  const fetcher = async (): Promise<IQuestions> => {
    const response = await fetch("https://twinword-word-association-quiz.p.rapidapi.com/type1/?level=3&area=sat", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "twinword-word-association-quiz.p.rapidapi.com",
        "x-rapidapi-key": "ec34d9069dmsh0a9a3ec61c4f322p121e36jsn53f89b10a240"
      },
    });
    const results = await response.json();

    return results;
  };

  const { data, error } = useSWR("questions", fetcher, {
    revalidateOnFocus: false,
    // revalidateOnMount: true,
    revalidateOnMount: typeof questions === 'undefined',
    revalidateOnReconnect: false,
    onSuccess: (data, _, __) => {
      setQuestions((_) => JSON.stringify(data));
      // const res = JSON.parse(questions) as IQuestions;
      // console.log(res);
      // console.log(typeof res);
    },
  });

  // const { isLoading, error, data } = useFetch<IQuestions>("https://twinword-word-association-quiz.p.rapidapi.com/type1/?level=3&area=sat", {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-host": "twinword-word-association-quiz.p.rapidapi.com",
  //     "x-rapidapi-key": "ec34d9069dmsh0a9a3ec61c4f322p121e36jsn53f89b10a240"
  //   },
  // });

  const handleNextClick = (currentPage: number): string => {
    return (currentPage + 1).toString();
  }

  return (
    <QuizContext.Provider value={data}>
      <QuizUserCompleted />
      <Divider
        className="py-2"
        style={{ marginLeft: "-2rem", marginRight: "-2rem" }}
      />
      <QuizQuestionsTime questionNumber={active - 1} />
      {typeof questions === 'undefined' ? (
        <div className="text-text-primary">Loading...</div>
      ) : (
        <MainQuiz
          question={questions!.quizlist[questionsPointer - 1]}
          // question={data!.quizlist[questionsPointer - 1]}
          questionNumber={questionsPointer}
        />
      )}
      {/* {(!data && !error) ? (
        <div className="text-text-primary">Loading</div>
      ) : error ? (
        <div className="text-text-primary">Error</div>
      ) : (
        <MainQuiz
          question={questions!.quizlist[questionsPointer - 1]}
          // question={data!.quizlist[questionsPointer - 1]}
          questionNumber={questionsPointer}
        />
      )} */}
      <div className="flex flex-wrap justify-center gap-2 py-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <QuizControlsButton
            onClick={() => setQuestionsPointer(`${num}`)}
            key={num}
          />
        ))}
      </div>

      {questionsPointer < 10 ? (
        <QuizNextQuestionButton handleQuestionChange={() => setQuestionsPointer((currentPage) => handleNextClick(parseInt(currentPage)))} />
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
    </QuizContext.Provider>
  );
};

export default QuizHome;
