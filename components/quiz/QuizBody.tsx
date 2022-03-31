import { FunctionComponent, useContext } from "react";
import MainQuiz from "./MainQuiz";
import QuizControlsButton from "./QuizControlsButton";
import QuizUserCompleted from "./QuizUserCompleted";
import QuizQuestionsTime from "./QuizQuestionsTime";
import Divider from "@mui/material/Divider";
import QuizNextQuestionButton from "./QuizNextQuestionButton";
import { Button, Typography } from "@mui/material";
import { QuizLocationContext, TimerContext } from "../../lib/data/providers";
import { QuizContext } from "../../pages/quiz/[[...slug]]";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  doc,
  DocumentReference,
  getDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { firestore, serverTimestamp } from "../../lib/utils/firebaseInit";
import {
  IFavorite,
  IFavoriteQuestion,
  IQuiz,
} from "../../lib/data_types/interfaces";

const QuizBody: FunctionComponent = () => {
  const {
    path,
    favoritesPath,
    questions: { area, level, author, email, quizlist },
    questionsPointer,
    answers,
  } = useContext(QuizContext)!;
  const { setQuizLocation } = useContext(QuizLocationContext)!;
  const timer = useContext(TimerContext)!;

  return (
    <>
      <QuizUserCompleted />
      <Divider
        className="py-2"
        style={{ marginLeft: "-2rem", marginRight: "-2rem" }}
      />
      <QuizQuestionsTime />
      <MainQuiz />
      <div className="flex flex-wrap justify-center gap-2 py-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <QuizControlsButton
            clickedNum={num}
            key={num}
            isAnswered={!!answers[num - 1]}
          />
        ))}
      </div>

      <div className="flex flex-col justify-end gap-4 sm:flex-row">
        <Button
          variant="outlined"
          disableElevation
          color="secondary"
          startIcon={
            quizlist[questionsPointer - 1].isFavorite ? (
              <FavoriteBorderIcon />
            ) : (
              <FavoriteIcon />
            )
          }
          onClick={async () => {
            const questionRef = doc(
              firestore,
              path
            ) as DocumentReference<IQuiz>;
            const quizDoc = await getDoc<IQuiz>(questionRef);
            const data = quizDoc.data();
            if (!data) return;

            const quizlist = data.questions.quizlist;
            const isFavorite =
              data.questions.quizlist[questionsPointer - 1].isFavorite;
            const currentQuizlist = quizlist.map((question, index) =>
              index === questionsPointer - 1
                ? { ...question, isFavorite: !isFavorite }
                : question
            );

            const batch = writeBatch(firestore);
            const ref = doc(
              firestore,
              favoritesPath
            ) as DocumentReference<IFavorite>;
            const favoritesDoc = await getDoc<IFavorite>(ref);
            const favorites = favoritesDoc.data();
            if (isFavorite) {
              const currentFavorites = favorites?.questions.filter(
                (favorite) => favorite.questionNumber !== questionsPointer
              );

              batch.set(ref, {
                questions: currentFavorites,
              });
            } else {
              let currentFavorites: IFavoriteQuestion[] | undefined = [];

              if (!favoritesDoc.exists()) {
                setDoc(ref, {
                  questions: [],
                }).then(async (_) => {
                  const favoritesDoc = await getDoc<IFavorite>(ref);
                  const favorites = favoritesDoc.data();
                  currentFavorites = favorites?.questions;
                  currentFavorites?.push({
                    area,
                    level,
                    questionNumber: questionsPointer,
                    quiz: quizlist[questionsPointer - 1].quiz,
                    option: quizlist[questionsPointer - 1].option,
                    correct: quizlist[questionsPointer - 1].correct,
                  });
                  setDoc(ref, {
                    questions: currentFavorites,
                  });
                });
              } else {
                currentFavorites = favorites?.questions;
                currentFavorites?.push({
                  area,
                  level,
                  questionNumber: questionsPointer,
                  quiz: quizlist[questionsPointer - 1].quiz,
                  option: quizlist[questionsPointer - 1].option,
                  correct: quizlist[questionsPointer - 1].correct,
                });
                batch.set(ref, {
                  questions: currentFavorites,
                });
              }
            }

            batch.update(questionRef, {
              questions: { ...data.questions, quizlist: currentQuizlist },
              timeRemaining: timer,
            });

            await batch.commit();
          }}
        >
          {quizlist[questionsPointer - 1].isFavorite
            ? "Unfavorite"
            : "Favorite"}
        </Button>
        {questionsPointer < 10 ? (
          <QuizNextQuestionButton />
        ) : (
          <Button
            variant="contained"
            disableElevation
            color="secondary"
            onClick={() => setQuizLocation("submit")}
          >
            Submit page
          </Button>
        )}
      </div>

      <div className="flex flex-col items-end mt-6">
        <Typography variant="caption" color="text.disabled">
          author: {author}
        </Typography>
        <Typography variant="caption" color="text.disabled">
          email: {email}
        </Typography>
      </div>
    </>
  );
};

export default QuizBody;
