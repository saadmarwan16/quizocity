import { GetServerSideProps, NextPage } from "next";
import Layout from "../components/shared/Layout";
import Image from "next/image";
import { Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import UserPoints from "../components/shared/UserPoints";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../lib/utils/firebaseInit";
import { ILeaderboard } from "../lib/data_types/interfaces";
import { useAuthContext } from "../lib/data/contexts/AuthContext";
import capitalize from "../lib/utils/capitalize";

interface LeaderboardProps {
  leaderboard: ILeaderboard[];
}

const Leaderboard: NextPage<LeaderboardProps> = ({ leaderboard }) => {
  const {
    authState: [user],
  } = useAuthContext();
  return (
    <Layout pageName="Leaderboard">
      <div className="w-full pb-6">
        <UserPoints />
        <Typography variant="h6" className="mt-12 mb-3 font-semibold">
          Leaderboard
        </Typography>
        <div className="flex flex-col gap-3">
          {leaderboard.map(({ uid, displayName, photoURL, points }, index) => (
            <div
              key={index}
              className="flex justify-between p-4 bg-background-paper rounded-xl"
            >
              <div className="flex items-center gap-4">
                <Typography>{index + 1}</Typography>
                <div className="flex items-center gap-2">
                  <Image
                    src={photoURL ?? "/person.png"}
                    alt="Marwan"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <Typography
                    className={
                      user?.uid === uid ? "font-semibold text-teal-500" : ""
                    }
                  >
                    {capitalize(displayName)} {user?.uid === uid && "(me)"}
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center justify-center w-5 h-5 bg-teal-700 rounded-3xl">
                  <StarIcon className="w-4 h-4f text-text-primary" />
                </div>
                <Typography>{points}</Typography>
              </div>
            </div>
          ))}
          <Typography className="text-center text-text-disabled">
            You have reached the end
          </Typography>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const leaderboardRef = collection(firestore, "leaderboard");
  const leaderboardDocs = await getDocs(
    query(leaderboardRef, orderBy("points", "desc"))
  );
  const leaderboard: ILeaderboard[] = [];
  leaderboardDocs.forEach((singleLeaderboard) => {
    const singleLeaderboardData = singleLeaderboard.data();
    leaderboard.push({
      uid: singleLeaderboard.id,
      displayName: singleLeaderboardData.displayName,
      photoURL: singleLeaderboardData.photoURL,
      points: singleLeaderboardData.points,
    });
  });

  return {
    props: {
      leaderboard,
    },
  };
};

export default Leaderboard;
