import { FunctionComponent } from "react";
import useFetch from "react-fetch-hook";

interface FetchProps {}

const Fetch: FunctionComponent<FetchProps> = () => {
  const { isLoading, error, data } = useFetch(
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
