import Button from "@mui/material/Button";
import { FunctionComponent } from "react";

interface QuizControlsButtonProps {
  onClick: () => void,
}
 
const QuizControlsButton: FunctionComponent<QuizControlsButtonProps> = ({onClick}) => {
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
          onClick={onClick}
        />
   );
}
 
export default QuizControlsButton;
