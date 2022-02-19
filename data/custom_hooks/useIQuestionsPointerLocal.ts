import { useLocalStorageValue } from "@mantine/hooks";
import { QUESTIONS_POINTER } from "../../constants/quiz";

const useIQuestionsPointerLocal = (): [number, (val: string | ((prevState: string) => string)) => void] => {
    // (val: string | ((prevState: string) => string)) => void
    const [questionsPointer, setQuestionsPointer] = useLocalStorageValue<string>({ key: QUESTIONS_POINTER, defaultValue: '1' });

    return [
        parseInt(questionsPointer),
        setQuestionsPointer,
    ];
}

export default useIQuestionsPointerLocal;