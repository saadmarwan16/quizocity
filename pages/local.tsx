import { useLocalStorageValue } from "@mantine/hooks";
import { FunctionComponent } from "react";
import { QUESTIONS } from "../constants/quiz";

interface LocalProps {

}

const Local: FunctionComponent<LocalProps> = () => {
    const [quiz, setQuiz] = useLocalStorageValue<string>({ key: QUESTIONS, defaultValue: 'hoe' })

    return (
        <div>
            <div className="text-text-primary">Hi, Mom</div>
            <div className="text-text-primary">{quiz}</div>
            <button className="text-text-primary" onClick={() => setQuiz(JSON.stringify({
                home: 'action',
            }))}>Set Quiz</button>
        </div>
    );
}

export default Local;