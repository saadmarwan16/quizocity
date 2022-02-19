import { NextPage } from "next";
import { useState } from "react";
import { IQuestions, IQuiz } from "../../interfaces";
import useSWR from "swr";
import useIQuestionsPointerLocal from "../../data/custom_hooks/useIQuestionsPointerLocal";
import useIQuestionsLocal from "../../data/custom_hooks/useIQuestionsLocal";
import useIAnswersLocal from "../../data/custom_hooks/useIAnswersLocal";
import QuizBody from "../../components/Home/QuizBody";
import { QuizContext } from "../../data/providers";

interface QuizProps {
  apiUrl: string,
  apiKey: string,
  apiHost: string,
}

const Quiz: NextPage<QuizProps> = () => {
  const [answers, setAnswers] = useIAnswersLocal();
  const [questions, setQuestions] = useIQuestionsLocal();
  const [questionsPointer, setQuestionsPointer] = useIQuestionsPointerLocal();
  
  const isDataLoaded = () => {
    return typeof questions !== 'undefined' && typeof answers !== undefined && typeof questionsPointer !== 'undefined';
  };


  const [quiz, setQuiz] = useState<IQuiz | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
  const apiHost = process.env.NEXT_PUBLIC_API_HOST as string;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;


  const fetcher = async (): Promise<IQuestions> => {
    const response = await fetch(`${apiUrl}/?level=3&area=sat`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": apiHost,
        "x-rapidapi-key": apiKey,
      },
    });
    const results = await response.json();

    return results;
  };

  const { data, error } = useSWR("questions", fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: typeof questions === 'undefined',
    revalidateOnReconnect: false,
    onSuccess: (data, _, __) => {
      setQuestions((_) => JSON.stringify(data));
    },
  });

  return (
    <QuizContext.Provider value={quiz}>
      {/* <div className="text-text-primary">Hello, Mom...</div> */}
      {quiz === null ? (
        <div className="text-text-primary">Loading...</div>
      ): (
        <QuizBody /> 
      )}
    </QuizContext.Provider>
  );
};

export default Quiz;
