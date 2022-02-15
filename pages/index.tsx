import Avatar from "@mui/material/Avatar";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import Head from "next/head";
import Button from "@mui/material/Button";
import MainQuiz from "../Home/MainQuiz";
import QuizControlButtons from "../Home/QuizControlButtons";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | Quizocity</title>
        <meta name="description" content="Customized Word Association Quiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center w-screen min-h-screen p-10 bg-black">
        <div className="w-4/5 p-8 mx-auto bg-background-paper rounded-xl">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Avatar src="/person.png" sx={{ width: 56, height: 56 }} />
              <Typography className="text-text-primary">
                Anonymous User
              </Typography>
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="text-text-primary">
                Total Test: 20% completed
              </Typography>
              <LinearProgress
                variant="determinate"
                value={20}
                color="secondary"
                sx={{
                  height: 5,
                  borderRadius: 5,
                  [`& .${linearProgressClasses.bar}`]: {
                    borderRadius: 5,
                  },
                }}
              />
            </div>
          </div>
          <Divider
            className="py-2"
            style={{ marginLeft: "-2rem", marginRight: "-2rem" }}
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Typography className="text-text-disabled">Questions</Typography>
              <div className="flex items-center gap-1">
                <Typography className="text-3xl text-text-primary">
                  1
                </Typography>
                <Typography className="text-text-secondary">/</Typography>
                <Typography className="text-text-secondary">10</Typography>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Typography className="text-text-disabled">
                TIME REMAINING
              </Typography>
              <div className="relative inline-flex">
                <CircularProgress variant="determinate" value={30} />
                <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                  <Typography className="text-text-primary">30</Typography>
                </div>
              </div>
            </div>
          </div>
          <MainQuiz />
          <QuizControlButtons />
          {/* <div className="w-4 h-4 bg-teal-700" />
            <div className="w-4 h-4 bg-text-disabled" /> */}
          <div className="flex justify-end">
            <Button
              variant="contained"
              disableElevation
              color="secondary"
              style={{ textTransform: "none", backgroundColor: "#d500f9" }}
            >
              Next question
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
