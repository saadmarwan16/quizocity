import { doc, getDoc } from "firebase/firestore";
import { createContext, FunctionComponent, useContext } from "react";
import { ILeaderboard } from "../../data_types/interfaces";
import { firestore } from "../../utils/firebaseInit";
import { useAuthContext } from "./AuthContext";

interface ILeaderboardContext {
  leaderboard: {
    uid: string;
    displayName: string;
    photoURL: string;
    points: number;
  };
}

const LeaderboardContext = createContext<ILeaderboardContext | null>(null);

export const useLeaderboard = () => useContext(LeaderboardContext)!;

const LeaderboardContextProvider: FunctionComponent = ({ children }) => {
  const {
    authState: [user],
  } = useAuthContext();

  const getLeaderboard = async () => {
    const leaderboard = (
      await getDoc(doc(firestore, `leaderboard/${user?.uid}`))
    ).data() as ILeaderboard;

    return leaderboard;
  };

  const value = {
    uid: leaderboard.uid,
    displayName: leaderboard.displayName,
    photoURL: leaderboard?.photoURL,
    points: leaderboard.points,
  };

  return (
    <LeaderboardContext.Provider value={value}>
      {children}
    </LeaderboardContext.Provider>
  );
};

export default LeaderboardContextProvider;
