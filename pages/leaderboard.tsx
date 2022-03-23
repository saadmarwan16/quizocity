import { NextPage } from "next";
import Layout from "../components/shared/Layout";
import Image from "next/image";
import { Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import UserPoints from "../components/shared/UserPoints";

const Leaderboard: NextPage = () => {
  return (
    <Layout pageName="Leaderboard">
      <div className="w-full pb-6">
        <UserPoints />
        <Typography variant="h6" className="mt-12 mb-3 font-semibold">
          Leaderboard
        </Typography>
        <div className="flex flex-col gap-3">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
            <div
              key={index}
              className="flex justify-between p-4 bg-background-paper rounded-xl"
            >
              <div className="flex items-center gap-4">
                <Typography>{index + 1}</Typography>
                <div className="flex items-center gap-2">
                  <Image
                    src="/person.png"
                    alt="Marwan"
                    width={50}
                    height={50}
                  />
                  <Typography>Marwan Sa-ad</Typography>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center justify-center w-5 h-5 bg-teal-700 rounded-3xl">
                  <StarIcon className="w-4 h-4f text-text-primary" />
                </div>
                <Typography>120</Typography>
              </div>
            </div>
          ))}
          <Typography className="text-center text-text-disabled">You have reached the end</Typography>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
