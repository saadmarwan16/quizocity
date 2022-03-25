import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { LOGIN, MAIN_QUIZ } from "../lib/constants/routes";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import Layout from "../components/shared/Layout";
import { useAuthContext } from "../lib/data/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import History from "../components/shared/History";
import Settings from "../components/shared/Settings";
import { quizArea } from "../lib/data";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Home: NextPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [examType, setExamType] = useState("");
  const [level, setLevel] = useState("");

  const router = useRouter();

  const handleExamTypeChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setExamType(event.target.value as string);
  };
  const handleLevelChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setLevel(event.target.value as string);
  };
  const {
    authState: [user],
  } = useAuthContext();

  useEffect(() => {
    if (!user) router.push(LOGIN);
  }, [user]);

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute p-4 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-96 bg-background-paper border-disabled rounded-xl">
          <Settings />
        </div>
      </Modal>
      <Layout pageName="Home">
        <div className="w-full">
          <section className="mb-12">
            <Typography variant="h4" className="mb-4 text-3xl md:text-4xl">
              Explore
            </Typography>
            <div className="flex flex-wrap justify-center gap-6">
              <div
                className="flex flex-col items-center justify-center gap-6 p-8 cursor-pointer w-52 h-52 md:w-80 md:h-80 bg-background-paper rounded-xl border-explore"
                onClick={() => {
                  const currentQuizArea =
                    quizArea[Math.round(Math.random() * 10)];
                  const quizLevel = Math.round(Math.random() * 9) + 1;

                  router.push(`${MAIN_QUIZ}/${currentQuizArea}/${quizLevel}`);
                }}
              >
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
              <div
                className="flex flex-col items-center justify-center gap-6 p-8 cursor-pointer w-52 h-52 md:w-80 md:h-80 bg-background-paper rounded-xl border-explore"
                onClick={() => setModalOpen(true)}
              >
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
              <div className="flex flex-col items-center justify-center gap-6 p-8 cursor-pointer w-52 h-52 md:w-80 md:h-80 bg-background-paper rounded-xl border-explore">
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
          <History />
          <Link href={MAIN_QUIZ}>
            <a>
              <Button variant="outlined">Go to Quiz</Button>
            </a>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default Home;
