import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { FC, ChangeEvent, useState } from "react";

const MainQuiz: FC = () => {
  const [value, setValue] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div className="mt-6 mb-4 sm:mt-4">
        <Typography className="text-text-disabled">
          Which of two words is more related to the given words below:
        </Typography>
        <Typography className="font-bold text-text-primary">
          value, estimate, evaluate
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
          <div className="pl-4 border rounded-md border-text-disabled">
            <FormControlLabel
              value="jury"
              control={<Radio className="text-text-primary" />}
              label="Jury"
              className="w-full text-text-primary"
            />
          </div>
          <div className="pl-4 border rounded-md border-text-disabled">
            <FormControlLabel
              value="asses"
              control={<Radio className="text-text-primary" />}
              label="Asses"
              className="w-full text-text-primary"
            />
          </div>
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default MainQuiz;
