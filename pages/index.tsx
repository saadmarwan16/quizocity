import { useLocalStorageValue } from "@mantine/hooks";
import { Button, CircularProgress } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import useFetch from "react-fetch-hook";
import { QUESTIONS } from "../constants/quiz";
import { IQuestions } from "../interfaces";
import router from 'next/router';
import { MAIN_QUIZ } from "../constants/routes";


const Home: NextPage = () => {
    // const [questions, setQuestions] = useLocalStorageValue<string>({ key: QUESTIONS, defaultValue: 'initial' });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleToQuizClicked = () => {
        // const { isLoading, error, data } = useFetch<IQuestions>("https://twinword-word-association-quiz.p.rapidapi.com/type1/?level=3&area=sat", {
        //     method: "GET",
        //     headers: {
        //         "x-rapidapi-host": "twinword-word-association-quiz.p.rapidapi.com",
        //         "x-rapidapi-key": "ec34d9069dmsh0a9a3ec61c4f322p121e36jsn53f89b10a240"
        //     },
        // });

        setIsLoading(true);
        router.push(MAIN_QUIZ);

        // if (isLoading) { setIsLoading(isLoading) } else {
        //     setIsLoading(isLoading);
        //     localStorage.setItem(QUESTIONS, JSON.stringify(data));
        // }
    };
    // console.log(questions);

    return (
        <div>
            <div className="text-text-primary">Hello, world</div>
            <Button variant="outlined" onClick={() => handleToQuizClicked()}>{isLoading ? <CircularProgress /> : "Go to Quiz"}</Button>
            {/* <Button variant="outlined">Go to Quiz</Button> */}
        </div>
    );
}

export default Home;