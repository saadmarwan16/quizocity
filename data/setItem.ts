import { questions } from "../data";
import { IQuestions, IUserAnswers } from "../interfaces";

const setItem = (key: string, value: IQuestions | IUserAnswers): void => {
    localStorage.setItem(key, JSON.stringify(value));
}

export default setItem;