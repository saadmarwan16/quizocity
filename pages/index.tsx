import { Button, IconButton, Typography } from "@mui/material";
import { NextPage } from "next";
import { MAIN_QUIZ } from "../lib/constants/routes";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import Layout from "../components/shared/Layout";

const Home: NextPage = () => {
  return (
    <Layout pageName="Home">
      <div className="w-full">
        <section className="mb-12">
          <Typography variant="h4" className="mb-4 text-3xl md:text-4xl">
            Explore
          </Typography>
          <div className="grid grid-cols-12 gap-6">
            <div className="flex flex-col items-center col-span-6 gap-6 p-8 cursor-pointer md:col-span-4 bg-background-paper rounded-xl border-explore">
              <div className="flex items-center justify-center w-12 h-12 bg-teal-700 rounded-3xl">
                <AddIcon className="text-text-primary" />
              </div>
              <Typography
                variant="h6"
                className="text-base text-center sm:text-lg md:text-xl"
              >
                Create quiz randomly
              </Typography>
            </div>
            <div className="flex flex-col items-center col-span-6 gap-6 p-8 cursor-pointer md:col-span-4 bg-background-paper rounded-xl border-explore">
              <div className="flex items-center justify-center w-12 h-12 bg-teal-700 rounded-3xl">
                <AddIcon className="text-text-primary" />
              </div>
              <Typography
                variant="h6"
                className="text-base text-center sm:text-lg md:text-xl"
              >
                Create quiz
              </Typography>
            </div>
            <div className="flex flex-col items-center col-span-6 gap-6 p-8 cursor-pointer md:col-span-4 bg-background-paper rounded-xl border-explore">
              <div className="flex items-center justify-center w-12 h-12 bg-teal-700 rounded-3xl">
                <AddIcon className="text-text-primary" />
              </div>
              <Typography
                variant="h6"
                className="text-base text-center sm:text-lg md:text-xl"
              >
                Create quiz with user settings
              </Typography>
            </div>
          </div>
        </section>
        <section className="mb-12">
          <Typography variant="h4" className="mb-4 text-3xl md:text-4xl">
            Create by Quiz Type
          </Typography>
          <div className="grid grid-cols-12 gap-6">
            {[
              "MS",
              "HS",
              "KSAT",
              "TOEIC",
              "TOEFL",
              "TEPS",
              "SAT",
              "IELTS",
              "GRE",
              "GRE",
              "GMAT",
              "OVERALL",
            ].map((type, index) => (
              <div
                key={index}
                className="flex flex-col items-center col-span-6 gap-6 p-8 cursor-pointer sm:col-span-4 md:col-span-3 bg-background-paper rounded-xl border-explore"
              >
                <Typography
                  variant="h6"
                  className="text-base text-center sm:text-lg md:text-xl"
                >
                  {type}
                </Typography>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-4">
          <Typography variant="h4" className="mb-4 text-3xl md:text-4xl">
            Create by Quiz Level
          </Typography>
          <div className="grid grid-cols-12 gap-6">
            {[
              "Level 1",
              "Level 2",
              "Level 3",
              "Level 4",
              "Level 5",
              "Level 6",
              "Level 7",
              "Level 8",
              "Level 9",
              "Level 10",
            ].map((type, index) => (
              <div
                key={index}
                className="flex flex-col items-center col-span-6 gap-6 p-8 cursor-pointer sm:col-span-4 md:col-span-3 bg-background-paper rounded-xl border-explore"
              >
                <Typography
                  variant="h6"
                  className="text-base text-center sm:text-lg md:text-xl"
                >
                  {type}
                </Typography>
              </div>
            ))}
          </div>
        </section>
        <Link href={MAIN_QUIZ}>
          <a>
            <Button variant="outlined">Go to Quiz</Button>
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
