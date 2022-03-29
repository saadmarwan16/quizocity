import { Skeleton, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { collection, CollectionReference } from "firebase/firestore";
import { useAuthContext } from "../../lib/data/contexts/AuthContext";
import { firestore, getDateTime } from "../../lib/utils/firebaseInit";
import { IHistory } from "../../lib/data_types/interfaces";

interface HistoryProps {}

const History: FunctionComponent<HistoryProps> = () => {
  const {
    authState: [user],
  } = useAuthContext();
  const colRef = collection(
    firestore,
    `users/${user?.uid}/history`
  ) as CollectionReference<IHistory>;
  const [histories, loading, error] = useCollectionData<IHistory>(colRef);

  return (
    <section className="mb-12">
      <Typography variant="h6" className="mt-12 mb-3 font-semibold">
        History
      </Typography>

      {loading && (
        <div className="flex flex-col gap-2">
          {[0, 1, 2, 3, 4].map((num) => (
            <Skeleton
              key={num}
              height={40}
              variant="rectangular"
              sx={{ borderRadius: "4px" }}
            />
          ))}
        </div>
      )}

      {error && <div>Error...</div>}

      {histories && (
        <div className="flex flex-col gap-2">
          {histories.map(({ area, createdAt, level, points }, index) => {
            const { date, time } = getDateTime(
              createdAt.seconds,
              createdAt.nanoseconds
            );

            console.log("history");

            return (
              <div key={index}>
                <div className="flex items-center gap-8 px-3 py-2 rounded-lg bg-background-paper">
                  <Typography
                    className="text-xs truncate basis-1/4 text-ellipsis"
                    color="text.secondary"
                  >
                    {date} {time}
                  </Typography>
                  <Typography
                    className="font-bold truncate basis-2/4 text-ellipsis"
                    color="text.secondary"
                  >
                    {area.toUpperCase()}, Level {level}
                  </Typography>
                  <div className="flex gap-1">
                    <Typography
                      className="font-bold basis-1/4"
                      color="text.secondary"
                    >
                      {points}
                    </Typography>
                    <Typography
                      className="font-bold basis-1/4 text-ellipsis"
                      color="text.secondary"
                    >
                      points
                    </Typography>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default History;
