import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useState, FunctionComponent, useContext } from "react";
import {
  AnswersContext,
  QuestionsContext,
  QuestionsPointerContext,
} from "../../lib/data/providers";
import { IAnswers } from "../../lib/data_types/types";
import capitalize from "../../lib/utils/capitalize";
import getBorderColor from "../../lib/utils/getBorderColor";

const MainQuiz: FunctionComponent = () => {
  const { answers, setAnswers } = useContext(AnswersContext)!;
  const {
    questions: { quizlist },
  } = useContext(QuestionsContext)!;
  const { questionsPointer } = useContext(QuestionsPointerContext)!;
  const { option, quiz } = quizlist[questionsPointer];
  const answer = answers[questionsPointer];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const res: IAnswers = answers.map((value, index) =>
      index === questionsPointer ? event.target.value : value
    ) as IAnswers;
    setAnswers(res);
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
