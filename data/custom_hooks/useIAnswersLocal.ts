import { useLocalStorageValue } from "@mantine/hooks";
import { ANSWERS } from "../../constants/quiz";
import { IAnswers } from "../../interfaces";


const useIAnswersLocal = (): [IAnswers | undefined, (val: string | ((prevState: string) => string)) => void] => {
    const [answers, setAnswers] = useLocalStorageValue({key: ANSWERS});

    return [
        typeof answers === 'undefined' ? undefined : JSON.parse(answers),
        setAnswers,
    ];
};

export default useIAnswersLocal;