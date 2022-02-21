import { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { IQuestions } from "../../lib/data_types/interfaces";
import {
  QuestionsContext,
  AnswersContext,
  QuestionsPointerContext,
} from "../../lib/data/providers";
import { initialAnswers } from "../../lib/data";
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
import QuizBody from "../../components/Home/QuizBody";

const Quiz: NextPage = () => {
  const [questions, setQuestions] = useQuestionsLocal();
  const [answers, setAnswers] = useAnswersLocal();
  const [questionsPointer, setQuestionsPointer] = useQuestionPointerLocal();

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
      console.log("called api");
      const results = (await fetcher()) as IQuestions;
      setQuestions(results);
      setAnswers(initialAnswers);
      setQuestionsPointer(0);
    };

    if (!!getQuestionsLocal()) {
      setQuestions(getQuestionsLocal()!);
      setAnswers(getAnswersLocal()!);
      setQuestionsPointer(getQuestionsPointerLocal()!);
    } else {
      fetchQuestions();
    }

    return () => {
      console.log("unmounted");
    };
  }, [fetcher]);

  return (
    <>
      {questions === null || answers === null || questionsPointer === null ? (
        <div className="text-text-primary">Loading...</div>
      ) : (
        <QuestionsContext.Provider value={{ questions, setQuestions }}>
          <AnswersContext.Provider value={{ answers, setAnswers }}>
            <QuestionsPointerContext.Provider
              value={{ questionsPointer, setQuestionsPointer }}
            >
              <QuizBody />
            </QuestionsPointerContext.Provider>
          </AnswersContext.Provider>
        </QuestionsContext.Provider>
      )}
    </>
  );
};

export default Quiz;
