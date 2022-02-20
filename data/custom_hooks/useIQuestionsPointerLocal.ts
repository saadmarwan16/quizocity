import { useLocalStorageValue } from "@mantine/hooks";
import { QUESTIONS_POINTER } from "../../constants/quiz";

const useIQuestionsPointerLocal = (): [number | undefined, (val: string | ((prevState: string) => string)) => void] => {
    const [questionsPointer, setQuestionsPointer] = useLocalStorageValue<string>({ key: QUESTIONS_POINTER, defaultValue: '0' });

    return [
        typeof questionsPointer === 'undefined' ? undefined : parseInt(questionsPointer),
        setQuestionsPointer,
    ];
}

export default useIQuestionsPointerLocal;