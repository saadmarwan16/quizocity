import { useLocalStorageValue } from "@mantine/hooks";
import { QUESTIONS } from "../../constants/quiz";
import { IQuestions } from "../../interfaces";

const useIQuestionsLocal = (): [IQuestions, (val: string | ((prevState: string) => string)) => void] => {
    const [questions, setQuestions] = useLocalStorageValue({key: QUESTIONS});
    console.log(questions);

    return [
        typeof questions === 'undefined' ? undefined : JSON.parse(questions),
        setQuestions,
    ]
}

export default useIQuestionsLocal;