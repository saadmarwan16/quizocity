import Image from "next/image";
import { Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { FunctionComponent } from "react";

interface UserPointsProps {}

const UserPoints: FunctionComponent<UserPointsProps> = () => {
  return (
    <div className="flex flex-col items-center">
      <Image src="/person.png" alt="Marwan" width={145} height={145} />
      <Typography variant="h5" className="mt-6 font-bold">
        Marwan Sa-ad
      </Typography>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center justify-center w-8 h-8 bg-teal-700 rounded-3xl">
          <StarIcon className="text-text-primary" />
        </div>
        <Typography variant="h5">120</Typography>
      </div>
    </div>
  );
};

export default UserPoints;
