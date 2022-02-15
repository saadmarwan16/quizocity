import { Button } from "@mui/material";
import { FunctionComponent } from "react";

interface QuizNextQuestionButtonProps {

}

const QuizNextQuestionButton: FunctionComponent<QuizNextQuestionButtonProps> = () => {
    return (<div className="flex justify-end">
        <Button
            variant="contained"
            disableElevation
            color="secondary"
            style={{ textTransform: "none", backgroundColor: "#d500f9" }}
        >
            Next question
        </Button>
    </div>);
}

export default QuizNextQuestionButton;