import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { FunctionComponent, useState } from "react";

interface SettingsProps {}

const Settings: FunctionComponent<SettingsProps> = () => {
  const [examType, setExamType] = useState("");
  const [level, setLevel] = useState("");

  const handleExamTypeChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setExamType(event.target.value as string);
  };

  const handleLevelChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setLevel(event.target.value as string);
  };

  return (
    <div className="">
      <Typography variant="h6" component="h2" className="text-white">
        Choose Quiz Settings
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="exam-type-label">Exam type</InputLabel>
        <Select
          labelId="exam-type-label"
          value={examType}
          label="Exam type"
          onChange={handleExamTypeChange}
        >
          {[
            "es",
            "ms",
            "hs",
            "ksat",
            "toeic",
            "toefl",
            "teps",
            "sat",
            "ielts",
            "gre",
            "gmat",
            "overall",
          ].map((examType) => (
            <MenuItem key={examType} value={examType} className="text-black">
              {examType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="exam-level-label">Exam level</InputLabel>
        <Select
          labelId="exam-level-label"
          value={level}
          label="Exam level"
          onChange={handleLevelChange}
        >
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((level) => (
            <MenuItem key={level} value={level} className="text-black">
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Settings;
