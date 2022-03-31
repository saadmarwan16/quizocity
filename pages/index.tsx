import {
  LinearProgress,
  Modal,
  SelectChangeEvent,
  Skeleton,
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
import { firestore, getDateTime } from "../lib/utils/firebaseInit";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { collection, CollectionReference } from "firebase/firestore";
import { IQuiz } from "../lib/data_types/interfaces";
import durationToMMSS from "../lib/utils/durationToMMSS";
import getPercentageCompleted from "../lib/utils/getPercentageCompleted";

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
  const colRef = collection(
    firestore,
    `users/${user?.uid}/quiz`
  ) as CollectionReference<IQuiz>;
  const [quizzes, loading, error] = useCollectionDataOnce(colRef);

  useEffect(() => {
    if (!user) router.push(LOGIN);
  }, [user, router]);

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
            <Typography variant="h6" className="mt-12 mb-3 font-semibold">
              Explore
            </Typography>
            <div className="flex flex-wrap justify-center gap-6">
              {loading && (
                <>
                  {[0, 1, 2].map((num) => (
                    <Skeleton
                      key={num}
                      variant="rectangular"
                      className="w-52 h-52 md:w-80 md:h-80"
                    />
                  ))}
                </>
              )}

              {quizzes?.map(
                (
                  {
                    createdAt,
                    answers,
                    id,
                    timeRemaining,
                    questions: { area, level },
                  },
                  index
                ) => {
                  const { date, time } = getDateTime(
                    createdAt.seconds,
                    createdAt.nanoseconds
                  );

                  return (
                    <Link key={index} href={`/quiz/${user?.uid}/${id}`}>
                      <a
                        className="flex flex-col items-center justify-between gap-6 cursor-pointer w-52 h-52 md:w-80 md:h-80 bg-background-paper border-explore"
                        onClick={() => localStorage.clear()}
                      >
                        <div className="flex flex-col items-center justify-center flex-grow gap-8">
                          <Typography variant="h4">
                            {getPercentageCompleted(answers)}%
                          </Typography>
                          <div className="flex flex-col items-center">
                            <Typography variant="body1" color="text.disabled">
                              {area.toUpperCase()}, Level {level}
                            </Typography>
                            <Typography variant="caption" color="text.disabled">
                              {date} {time}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.disabled"
                              textAlign="center"
                            >
                              Time left: {durationToMMSS(timeRemaining)}
                            </Typography>
                          </div>
                        </div>
                        <LinearProgress
                          className="flex-grow-0"
                          variant="determinate"
                          value={getPercentageCompleted(answers)}
                          color="secondary"
                          sx={{
                            height: 3,
                            width: "100%",
                          }}
                        />
                      </a>
                    </Link>
                  );
                }
              )}

              <div
                className="flex flex-col items-center justify-center gap-6 p-8 cursor-pointer w-52 h-52 md:w-80 md:h-80 bg-background-paper rounded-xl border-explore"
                onClick={() => {
                  const currentQuizArea =
                    quizArea[Math.round(Math.random() * 10)];
                  const quizLevel = Math.round(Math.random() * 9) + 1;
                  localStorage.clear();

                  router.push(
                    `${MAIN_QUIZ}/${user?.uid}/${currentQuizArea}/${quizLevel}`
                  );
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
        </div>
      </Layout>
    </>
  );
};

export default Home;
