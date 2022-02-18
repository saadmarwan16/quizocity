import { createContext, FunctionComponent, useContext, useState } from "react";

interface ContextProps {
    
}

const QuizContext = createContext<string | null>(null)
 
const Context: FunctionComponent<ContextProps> = () => {
    const [str, setStr] = useState('Hello, Mom');

    return ( 
        <QuizContext.Provider value={str}>
            <div className="text-text-primary">Hello, world</div>
            <SubContext />
            <button onClick={() => setStr('Hi Mom')}>Change to Hi Mom</button>
        </QuizContext.Provider>
     );
}
 
export default Context;

interface SubContextProps {
    
}
 
const SubContext: FunctionComponent<SubContextProps> = () => {
    const str = useContext(QuizContext);

    return ( 
        <div className="text-text-primary">{str}</div>
     );
}