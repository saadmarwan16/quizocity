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
          <Typography variant="h6" component="h2" className="text-white">
            Choose Quiz Settings
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="exam-type-label">Exam type</InputLabel>
            <Select
              labelId="exam-type-label"
              value={examType}
              label="Exam type"
              onChange={handleExamTypeChange}
            >
              {[
                "es",
                "ms",
                "hs",
                "ksat",
                "toeic",
                "toefl",
                "teps",
                "sat",
                "ielts",
                "gre",
                "gmat",
                "overall",
              ].map((examType) => (
                <MenuItem
                  key={examType}
                  value={examType}
                  className="text-black"
                >
                  {examType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="exam-level-label">Exam level</InputLabel>
            <Select
              labelId="exam-level-label"
              value={level}
              label="Exam level"
              onChange={handleLevelChange}
            >
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(
                (level) => (
                  <MenuItem key={level} value={level} className="text-black">
                    {level}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </div>
      </Modal>
      <Layout pageName="Home">
        <div className="w-full">
          <section className="mb-12">
            <Typography variant="h4" className="mb-4 text-3xl md:text-4xl">
              Explore
            </Typography>
            {/* <div className="grid grid-cols-12 gap-6"> */}
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex flex-col items-center justify-center gap-6 p-8 cursor-pointer w-52 h-52 md:w-80 md:h-80 bg-background-paper rounded-xl border-explore">
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
          <section className="mb-12">
            <Typography variant="h4" className="mb-4 text-3xl md:text-4xl">
              Quiz History
            </Typography>
            <div className="flex items-center gap-8 px-3 py-2 rounded-lg bg-background-paper">
              <Typography
                className="text-xs truncate basis-1/4 text-ellipsis"
                color="text.secondary"
              >
                Mar, 5, 2022 08:10
              </Typography>
              <Typography
                className="font-bold truncate basis-2/4 text-ellipsis"
                color="text.secondary"
              >
                Untitled1
              </Typography>
              <div className="flex gap-1">
                <Typography
                  className="font-bold basis-1/4"
                  color="text.secondary"
                >
                  30
                </Typography>
                <Typography
                  className="font-bold basis-1/4 text-ellipsis"
                  color="text.secondary"
                >
                  points
                </Typography>
              </div>
            </div>
          </section>
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
