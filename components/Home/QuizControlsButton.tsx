import Button from "@mui/material/Button";
import { FunctionComponent, useContext } from "react";
import { QuizContext } from "../../data/providers";

interface QuizControlsButtonProps {
  clickedNum: number,
}
 
const QuizControlsButton: FunctionComponent<QuizControlsButtonProps> = ({clickedNum}) => {
  const {questionsPointer: { setQuestionsPointer }} = useContext(QuizContext)!;
  
  return ( 
    <Button
          variant="contained"
          disableElevation
          style={{
            minWidth: 20,
            minHeight: 20,
            padding: 0,
            backgroundColor: "#ffffff80",
          }}
          onClick={() => setQuestionsPointer((_) => clickedNum.toString())}
        />
   );
}
 
export default QuizControlsButton;
