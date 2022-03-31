import { FunctionComponent, useContext, useEffect, useState } from "react";
import { QuizLocationContext, TimerContext } from "../../lib/data/providers";
import QuizBody from "./QuizBody";
import QuizComplete from "./QuizComplete";
import QuizSubmit from "./QuizSubmit";

interface QuizTimerProps {
  currentTimer: number;
}

const QuizTimer: FunctionComponent<QuizTimerProps> = ({ currentTimer }) => {
  const [timer, setTimer] = useState<number>(currentTimer);
  const { quizLocation, setQuizLocation } = useContext(QuizLocationContext)!;

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
    <TimerContext.Provider value={timer}>
      {(quizLocation === "main" || quizLocation === null) && (
        <div className="flex flex-col justify-center w-full min-h-screen p-8 mx-auto md:w-4/5 bg-background md:bg-background-paper rounded-xl md:min-h-fit">
          <QuizBody />
        </div>
      )}
      {quizLocation === "submit" && <QuizSubmit />}
      {quizLocation === "complete" && <QuizComplete />}
    </TimerContext.Provider>
  );
};

export default QuizTimer;
