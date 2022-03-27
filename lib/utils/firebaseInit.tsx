import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  increment as firebaseIncrement,
  setDoc,
} from "firebase/firestore";
import { initialAnswers } from "../data";
import { IQuestions } from "../data_types/interfaces";

const firebaseConfig = {
  apiKey: "AIzaSyC-QjPybUKXhsnDy9o8dEhrAcwCKUE2pM4",
  authDomain: "quizocity-65f6b.firebaseapp.com",
  projectId: "quizocity-65f6b",
  storageBucket: "quizocity-65f6b.appspot.com",
  messagingSenderId: "904099752923",
  appId: "1:904099752923:web:94f5a43be33be4b5e795fe",
};

export const fetchQuiz = async (
  userId: string,
  area: string,
  level: string,
  shouldCreate: boolean
) => {
  const currentQuizRef = doc(
    firestore,
    `users/${userId}/userInfo/currentQuizId`
  );
  const currentQuizDoc = await getDoc(currentQuizRef);
  const currentQuizData = currentQuizDoc.data();

  const createQuiz = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
    const apiHost = process.env.NEXT_PUBLIC_API_HOST as string;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;

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
    await setDoc(currentQuizRef, {
      currentQuizId: quizDocRef.id,
    });

    return quizDocRef.id;
  };

  if (!currentQuizDoc.exists()) {
    return await createQuiz();
  }

  if (!shouldCreate) {
    await setDoc(currentQuizRef, {
      currentQuizId: currentQuizData?.currentQuizId,
    });

    return currentQuizData?.currentQuizId as string;
  }

  return await createQuiz();
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const increment = firebaseIncrement;
