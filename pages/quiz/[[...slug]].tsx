import { GetServerSideProps, NextPage } from "next";
import { createContext, useEffect, useState } from "react";
import {
  IQuestions,
  IQuiz,
  IQuizContext,
} from "../../lib/data_types/interfaces";
import { QuizLocationContext, TimerContext } from "../../lib/data/providers";
import { initialAnswers } from "../../lib/data";
import QuizBody from "../../components/quiz/QuizBody";
import QuizSubmit from "../../components/quiz/QuizSubmit";
import { useQuizLocationLocal } from "../../lib/data/local_data_sources/quizLocationLocal";
import QuizComplete from "../../components/quiz/QuizComplete";
import Layout from "../../components/shared/Layout";
import { firestore } from "../../lib/utils/firebaseInit";
import { addDoc, collection, doc, DocumentReference } from "firebase/firestore";
import { MAIN_QUIZ } from "../../lib/constants/routes";
import { useDocumentData } from "react-firebase-hooks/firestore";

export const QuizContext = createContext<IQuizContext | null>(null);

interface PageProps {
  path: string;
}

const Quiz: NextPage<PageProps> = ({ path }) => {
  const quizRef = doc(firestore, path) as DocumentReference<IQuiz>;
  const [snapshot, loading, error] = useDocumentData<IQuiz>(quizRef);
  const [quizLocation, setQuizLocation] = useQuizLocationLocal();
  const [timer, setTimer] = useState<number>(100000);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimer((timer) => (timer -= 1));
    }, 1000);

    if (timer <= 0) {
      clearTimeout(timerId);
      setQuizLocation("complete");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return (
    <Layout pageName="Quiz">
      {loading && <div>Loading ...</div>}

      {error && <div>Error...</div>}

      {snapshot && (
        <QuizContext.Provider
          value={{
            path,
            questions: snapshot.questions,
            answers: snapshot.answers,
            questionsPointer: snapshot.questionsPointer,
          }}
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
        </QuizContext.Provider>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const params = query.slug;

  if (!params) {
    return {
      props: { questionsProps: null },
    };
  } else if (params.length === 2) {
    const path = `users/${params[0]}/quiz/${params[1]}`;

    return {
      props: {
        path,
      },
    };
  } else if (params.length === 3) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
    const apiHost = process.env.NEXT_PUBLIC_API_HOST as string;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
    const userId = params[0];
    const area = params[1];
    const level = params[2];

    const response = await fetch(`${apiUrl}/?level=${level}&area=${area}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": apiHost,
        "x-rapidapi-key": apiKey,
      },
    });
    const questions = (await response.json()) as IQuestions;
    const quizRef = collection(firestore, `users/${userId}/quiz`);
    const quizDocRef = await addDoc(quizRef, {
      questions: questions,
      answers: initialAnswers,
      questionsPointer: 1,
    });

    return {
      redirect: {
        destination: `${MAIN_QUIZ}/${userId}/${quizDocRef.id}`,
        permanent: false,
      },
    };
  }

  return {
    notFound: true,
  };
};

export default Quiz;
