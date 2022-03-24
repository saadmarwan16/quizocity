import { Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface HistoryProps {}

const History: FunctionComponent<HistoryProps> = () => {
  return (
    <section className="mb-12">
      <Typography variant="h6" className="mt-12 mb-3 font-semibold">
        History
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
          <Typography className="font-bold basis-1/4" color="text.secondary">
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
  );
};

export default History;
