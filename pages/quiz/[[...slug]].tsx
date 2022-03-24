import { GetServerSideProps, NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { IQuestions } from "../../lib/data_types/interfaces";
import {
  QuestionsContext,
  AnswersContext,
  QuestionsPointerContext,
  QuizLocationContext,
  TimerContext,
} from "../../lib/data/providers";
import { initialAnswers, quizArea, quizLevel } from "../../lib/data";
import {
  getQuestionsLocal,
  useQuestionsLocal,
} from "../../lib/data/local_data_sources/questionsLocal";
import {
  getAnswersLocal,
  useAnswersLocal,
} from "../../lib/data/local_data_sources/answersLocal";
import {
  getQuestionsPointerLocal,
  useQuestionPointerLocal,
} from "../../lib/data/local_data_sources/questionsPointerLocal";
import QuizBody from "../../components/quiz/QuizBody";
import { TAnswers } from "../../lib/data_types/types";
import QuizSubmit from "../../components/quiz/QuizSubmit";
import { useQuizLocationLocal } from "../../lib/data/local_data_sources/quizLocationLocal";
import QuizComplete from "../../components/quiz/QuizComplete";
import Layout from "../../components/shared/Layout";
import { auth } from "../../lib/utils/firebaseInit";

interface PageProps {
    questionsProps: IQuestions | null,
    answersProps: TAnswers | null,
    questionsPointerProps: number | null,
}

const Quiz: NextPage<PageProps> = ({questionsProps, answersProps, questionsPointerProps}) => {
  const [questions, setQuestions] = useQuestionsLocal();
  const [answers, setAnswers] = useAnswersLocal();
  const [questionsPointer, setQuestionsPointer] = useQuestionPointerLocal();
  const [quizLocation, setQuizLocation] = useQuizLocationLocal();
  const [timer, setTimer] = useState<number>(100000);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
  const apiHost = process.env.NEXT_PUBLIC_API_HOST as string;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;

  const fetcher = useCallback(async () => {
    const response = await fetch(`${apiUrl}/?level=3&area=sat`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": apiHost,
        "x-rapidapi-key": apiKey,
      },
    });
    const results = await response.json();

    return results;
  }, [apiHost, apiKey, apiUrl]);

  const getQuiz = useCallback(
    (questions: IQuestions, answers: TAnswers, questionsPointer: number) => {
      setQuestions(questions);
      setAnswers(answers);
      setQuestionsPointer(questionsPointer);
    },
    [setAnswers, setQuestions, setQuestionsPointer]
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      const results = (await fetcher()) as IQuestions;
      getQuiz(results, initialAnswers, 1);
    };

    const timerId = setTimeout(() => {
      setTimer((timer) => (timer -= 1));
    }, 1000);

    if (timer <= 0) {
      clearTimeout(timerId);
      setQuizLocation("complete");
    }

    if (
      !getQuestionsLocal() ||
      !getAnswersLocal() ||
      !getQuestionsPointerLocal()
    ) {
      localStorage.clear();
      fetchQuestions();
    } else {
      getQuiz(
        getQuestionsLocal()!,
        getAnswersLocal()!,
        getQuestionsPointerLocal()!
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher, getQuiz, timer]);

  return (
    <Layout pageName="Quiz">
      {questions === null || answers === null || questionsPointer === null ? (
        <div>Loading...</div>
      ) : (
        <QuestionsContext.Provider value={{ questions, setQuestions }}>
          <AnswersContext.Provider value={{ answers, setAnswers }}>
            <QuestionsPointerContext.Provider
              value={{ questionsPointer, setQuestionsPointer }}
            >
              <QuizLocationContext.Provider
                value={{ quizLocation, setQuizLocation }}
              >
                <TimerContext.Provider value={timer}>
                  {(quizLocation === "main" || quizLocation === null) && (
                    <div className="flex flex-col justify-center w-full min-h-screen p-8 mx-auto md:w-4/5 bg-background md:bg-background-paper rounded-xl md:min-h-fit">
                      <QuizBody />
                    </div>
                  )}
                  {quizLocation === "submit" && <QuizSubmit />}
                  {quizLocation === "complete" && <QuizComplete />}
                </TimerContext.Provider>
              </QuizLocationContext.Provider>
            </QuestionsPointerContext.Provider>
          </AnswersContext.Provider>
        </QuestionsContext.Provider>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const params = query.slug as string[] | undefined;
  if (!params) {
    return {
      props: { value: null },
    };
  }

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
//   const apiHost = process.env.NEXT_PUBLIC_API_HOST as string;
//   const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;

//   if (params.length === 1 && params[0] === "random") {
//     const level = quizLevel[Math.round(Math.random() * 10)];
//     const area = quizArea[Math.round(Math.random() * 12)];

//     try {
//       const response = await fetch(`${apiUrl}/?level=${level}&area=${area}`, {
//         method: "GET",
//         headers: {
//           "x-rapidapi-host": apiHost,
//           "x-rapidapi-key": apiKey,
//         },
//       });
//       const results = (await response.json()) as IQuestions;

//       return {
//         props: {
//           value: results,
//         },
//       };
//     } catch (e) {
//       return {
//         props: {
//           value: "error",
//         },
//       };
//     }
//   }

  return {
    props: { value: "string" },
  };
};

export default Quiz;