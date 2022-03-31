import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { ChangeEvent, FunctionComponent, useContext } from "react";
import capitalize from "../../lib/utils/capitalize";
import getBorderColor from "../../lib/utils/getBorderColor";
import { QuizContext } from "../../pages/quiz/[[...slug]]";
import { TAnswers } from "../../lib/data_types/types";
import { firestore } from "../../lib/utils/firebaseInit";
import { doc, updateDoc } from "firebase/firestore";
import { TimerContext } from "../../lib/data/providers";

const MainQuiz: FunctionComponent = () => {
  const {
    path,
    answers,
    questions: { quizlist },
    questionsPointer,
  } = useContext(QuizContext)!;
  const { option, quiz } = quizlist[questionsPointer - 1];
  const answer = answers[questionsPointer - 1];
  const timer = useContext(TimerContext)!;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const res: TAnswers = answers.map((value, index) =>
      index === questionsPointer - 1 ? event.target.value : value
    ) as TAnswers;
    const ref = doc(firestore, path);
    updateDoc(ref, {
      answers: res,
      timeRemaining: timer,
    });
  };

  return (
    <>
      <div className="mt-6 mb-4 sm:mt-4">
        <Typography className="text-text-disabled">
          Which of two words is more related to the given words below:
        </Typography>
        <Typography className="font-bold">
          {`${quiz[0]}, ${quiz[1]}, ${quiz[2]}`}
        </Typography>
      </div>
      <FormControl fullWidth className="mt-6">
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={answer}
          onChange={handleChange}
          className="flex gap-3 flex-cols"
        >
          <div
            className={`pl-4 border rounded-md ${getBorderColor(
              answer,
              option[0]
            )}`}
          >
            <FormControlLabel
              value={option[0]}
              control={
                <Radio
                  sx={{
                    "> span": {
                      color: option[0] !== answer ? "#ffffff" : null,
                    },
                  }}
                />
              }
              label={capitalize(option[0])}
              className="w-full"
            />
          </div>
          <div
            className={`pl-4 border rounded-md ${getBorderColor(
              answer,
              option[1]
            )}`}
          >
            <FormControlLabel
              value={option[1]}
              control={
                <Radio
                  sx={{
                    "> span": {
                      color: option[1] !== answer ? "#ffffff" : null,
                    },
                  }}
                />
              }
              label={capitalize(option[1])}
              className="w-full"
            />
          </div>
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default MainQuiz;
