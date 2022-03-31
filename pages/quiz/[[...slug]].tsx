import { GetServerSideProps, NextPage } from "next";
import { createContext } from "react";
import { IQuiz, IQuizContext } from "../../lib/data_types/interfaces";
import { QuizLocationContext, TimerContext } from "../../lib/data/providers";
import { quizArea } from "../../lib/data";
import QuizBody from "../../components/quiz/QuizBody";
import QuizSubmit from "../../components/quiz/QuizSubmit";
import { useQuizLocationLocal } from "../../lib/data/local_data_sources/quizLocationLocal";
import QuizComplete from "../../components/quiz/QuizComplete";
import Layout from "../../components/shared/Layout";
import { fetchQuiz, firestore } from "../../lib/utils/firebaseInit";
import { doc, DocumentReference } from "firebase/firestore";
import { MAIN_QUIZ } from "../../lib/constants/routes";
import { useDocumentData } from "react-firebase-hooks/firestore";
import QuizSkeleton from "../../components/quiz/QuizSkeleton";
import QuizTimer from "../../components/quiz/QuizTimer";

export const QuizContext = createContext<IQuizContext | null>(null);

interface PageProps {
  path: string;
  favoritesPath: string;
  historyPath: string;
}

const Quiz: NextPage<PageProps> = ({ path, favoritesPath, historyPath }) => {
  const quizRef = doc(firestore, path) as DocumentReference<IQuiz>;
  const [snapshot, loading, error] = useDocumentData<IQuiz>(quizRef);
  const [quizLocation, setQuizLocation] = useQuizLocationLocal();

  return (
    <Layout pageName="Quiz">
      {loading && (
        <div className="flex flex-col justify-center w-full min-h-screen p-8 mx-auto md:w-4/5 bg-background md:bg-background-paper rounded-xl md:min-h-fit">
          <QuizSkeleton />
        </div>
      )}

      {error && <div>Error...</div>}

      {snapshot && (
        <QuizContext.Provider
          value={{
            path,
            favoritesPath,
            historyPath,
            id: snapshot.id,
            timeRemaining: snapshot.timeRemaining,
            totalTime: snapshot.totalTime,
            questions: snapshot.questions,
            answers: snapshot.answers,
            questionsPointer: snapshot.questionsPointer,
          }}
        >
          <QuizLocationContext.Provider
            value={{ quizLocation, setQuizLocation }}
          >
            <QuizTimer currentTimer={snapshot.timeRemaining} />
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
      notFound: true,
    };
  }

  if (params.length === 1) {
    const quizId = await fetchQuiz(
      params[0],
      quizArea[Math.round(Math.random() * 10)],
      (Math.round(Math.random() * 9) + 1).toString(),
      false
    );

    return {
      redirect: {
        destination: `${MAIN_QUIZ}/${params[0]}/${quizId}`,
        permanent: false,
      },
    };
  } else if (params.length === 2) {
    const path = `users/${params[0]}/quiz/${params[1]}`;
    const favoritesPath = `users/${params[0]}/favorites/${params[1]}`;
    const historyPath = `users/${params[0]}/history`;

    return {
      props: {
        path,
        favoritesPath,
        historyPath,
      },
    };
  } else if (params.length === 3) {
    const quizId = await fetchQuiz(params[0], params[1], params[2], true);

    return {
      redirect: {
        destination: `${MAIN_QUIZ}/${params[0]}/${quizId}`,
        permanent: false,
      },
    };
  }

  return {
    notFound: true,
  };
};

export default Quiz;
