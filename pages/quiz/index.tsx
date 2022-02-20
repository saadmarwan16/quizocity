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
import { getAnswersLocal, useAnswersLocal } from "../../data/local_data_sources/answersLocal";
import { getQuestionsPointerLocal, useQuestionPointerLocal } from "../../data/local_data_sources/questionsPointerLocal";

const Quiz: NextPage = () => {
  const [questions, setQuestions] = useQuestionsLocal();
  const [answers, setAnswers] = useAnswersLocal();
  const [questionsPointer, setQuestionsPointer] = useQuestionPointerLocal();

  const [quiz, setQuiz] = useState<IQuiz | null>(null);

  const getQuiz = useCallback(
    (questions: IQuestions) => {
      setQuiz((_) => ({
        answers: { getAnswers: answers!, setAnswers },
        questions: { getQuestions: questions!, setQuestions },
        questionsPointer: {
          getQuestionsPointer: questionsPointer!,
          setQuestionsPointer,
        },
      }));
    },
    [answers, setAnswers, setQuestions, questionsPointer, setQuestionsPointer]
  );

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
    const fetchQuestions = async () => {
      console.log("got questions");
      const results = (await fetcher()) as IQuestions;
      setQuestions(results);
      setAnswers(initialAnswers);
      setQuestionsPointer(0);
      setQuiz({
        questions: { getQuestions: results, setQuestions },
        answers: { getAnswers: initialAnswers, setAnswers },
        questionsPointer: { getQuestionsPointer: 0, setQuestionsPointer },
      });
    };

    if (!!getQuestionsLocal()) {
      setQuiz({
        questions: { getQuestions: getQuestionsLocal()!, setQuestions },
        answers: { getAnswers: getAnswersLocal()!, setAnswers },
        questionsPointer: { getQuestionsPointer: getQuestionsPointerLocal()!, setQuestionsPointer },
      });
    } else {
      fetchQuestions();
    }

    return () => {
      console.log("unmounted");
    };
  }, [fetcher, questions, getQuiz, setQuestions, setAnswers, setQuestionsPointer]);

  return (
    <QuizContext.Provider value={quiz}>
      {quiz === null ? (
        <div className="text-text-primary">Loading...</div>
      ) : (
        <QuizBody />
        // <div className="text-text-primary">Hello, Mom...</div>
      )}
    </QuizContext.Provider>
  );
};

export default Quiz;
