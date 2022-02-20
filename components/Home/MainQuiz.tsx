import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useState, FunctionComponent, useContext } from "react";
import { QuizContext } from "../../data/providers";

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const MainQuiz: FunctionComponent = () => {
  const [value, setValue] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const getBorderColor = (
    radioValue: string | null,
    optionValue: string
  ): string => {
    if (radioValue === optionValue) {
      return "border-teal-700";
    } else {
      return "border-text-disabled";
    }
  };

  const {
    questionsPointer: { getQuestionsPointer },
    questions: { getQuestions },
  } = useContext(QuizContext)!;
  console.log(useContext(QuizContext)!);
  console.log(getQuestions.quizlist);
  console.log(getQuestionsPointer);
  const { option, quiz } = getQuestions.quizlist[getQuestionsPointer];

  return (
    <>
      <div className="mt-6 mb-4 sm:mt-4">
        <Typography className="text-text-disabled">
          Which of two words is more related to the given words below:
        </Typography>
        <Typography className="font-bold text-text-primary">
          {`${quiz[0]}, ${quiz[1]}, ${quiz[2]}`}
        </Typography>
      </div>
      <FormControl fullWidth className="mt-6">
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
          className="flex gap-3 flex-cols"
        >
          <div
            className={`pl-4 border rounded-md ${getBorderColor(
              value,
              option[0]
            )}`}
          >
            <FormControlLabel
              value={option[0]}
              control={<Radio className="text-text-primary" />}
              label={capitalize(option[0])}
              className="w-full text-text-primary"
            />
          </div>
          <div
            className={`pl-4 border rounded-md ${getBorderColor(
              value,
              option[1]
            )}`}
          >
            <FormControlLabel
              value={option[1]}
              control={<Radio className="text-text-primary" />}
              label={capitalize(option[1])}
              className="w-full text-text-primary"
            />
          </div>
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default MainQuiz;
