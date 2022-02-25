import { FunctionComponent } from "react";
import useFetch from "react-fetch-hook";
import { IQuestions } from "../lib/data_types/interfaces";

interface FetchProps {}

const Fetch: FunctionComponent<FetchProps> = () => {
  const { isLoading, error, data } = useFetch<IQuestions>(
    "https://opentdb.com/api.php?amount=10"
  );
  if (isLoading) {
    return <div className="text-text-primary">Loading ...</div>;
  }
  if (!error) {
    return <div className="text-text-primary">Error ...</div>;
  }

  return <div className="text-text-primary">Data</div>;
};

export default Fetch;
