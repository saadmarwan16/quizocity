import { Button } from "@mui/material";
import { NextPage } from "next";
import { MAIN_QUIZ } from "../lib/constants/routes";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <div className="mb-4 text-text-primary">Home page</div>
      <Link href={MAIN_QUIZ}>
        <a>
          <Button variant="outlined">Go to Quiz</Button>
        </a>
      </Link>
    </div>
  );
};

export default Home;
