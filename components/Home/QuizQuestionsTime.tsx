import { CircularProgress, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface QuizQuestionsTimeProps {

}

const QuizQuestionsTime: FunctionComponent<QuizQuestionsTimeProps> = () => {
    return (
        <div className="flex flex-col justify-between mt-8 sm:mt-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
                <Typography className="text-text-disabled">Questions</Typography>
                <div className="flex items-center gap-1">
                    <Typography className="text-3xl text-text-primary">
                        1
                    </Typography>
                    <Typography className="text-text-secondary">/</Typography>
                    <Typography className="text-text-secondary">10</Typography>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Typography className="text-text-disabled">
                    TIME REMAINING
                </Typography>
                <div className="relative inline-flex">
                    <CircularProgress variant="determinate" value={30} />
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                        <Typography className="text-text-primary">30</Typography>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizQuestionsTime;