import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { IQuestions, IQuiz } from "../../interfaces";
import QuizBody from "../../components/Home/QuizBody";
import { QuizContext } from "../../data/providers";
import { initialAnswers, questions as questn } from "../../data";
import {
  getQuestionsLocal,
  useQuestionsLocal,
} from "../../data/local_data_sources/questionsLocal";
import {
  getAnswersLocal,
  useAnswersLocal,
} from "../../data/local_data_sources/answersLocal";
import {
  getQuestionsPointerLocal,
  useQuestionPointerLocal,
} from "../../data/local_data_sources/questionsPointerLocal";
import MainQuiz from "../../components/Home/MainQuiz";

const Quiz: NextPage = () => {
  const [questions, setQuestions] = useQuestionsLocal();
  // const [answers, setAnswers] = useAnswersLocal();
  // const [questionsPointer, setQuestionsPointer] = useQuestionPointerLocal();

  // const quiz: IQuiz = {
  //   questions: { getQuestions: questions, setQuestions },
  //   answers: { getAnswers: answers, setAnswers },
  //   questionsPointer: {
  //     getQuestionsPointer: questionsPointer,
  //     setQuestionsPointer,
  //   },
  // };

  // const [questions, setQuestions] = useState<IQuestions | null>(null);

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

  useEffect(() => {
    console.log("update");
    const fetchQuestions = async () => {
      console.log('called api');
      const results = (await fetcher()) as IQuestions;
      setQuestions(results);
    };

    if (!!getQuestionsLocal()) {
      setQuestions(getQuestionsLocal()!);
    } else {
      fetchQuestions();
    }

    return () => {
      console.log("unmounted");
    };
  }, [fetcher]);

  return (
    <QuizContext.Provider value={questions}>
      {questions === null ? (
        <div className="text-text-primary">Loading...</div>
      ) : (
        // <div className="text-text-primary">{questions.area}</div>
        <MainQuiz />
      )}
    </QuizContext.Provider>
  );
};

export default Quiz;
