import { Avatar, LinearProgress, linearProgressClasses, Typography } from "@mui/material";
import { FunctionComponent } from "react";
 
const QuizUserCompleted: FunctionComponent = () => {
    return ( 
        <div className="flex flex-col justify-between gap-3 sm:flex-row md:gap-0">
            <div className="flex items-center gap-3">
              <Avatar src="/person.png" sx={{ width: 56, height: 56 }} />
              <Typography className="text-text-primary">
                Anonymous User
              </Typography>
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="text-text-primary">
                Total Test: 20% completed
              </Typography>
              <LinearProgress
                variant="determinate"
                value={20}
                color="secondary"
                sx={{
                  height: 5,
                  borderRadius: 5,
                  [`& .${linearProgressClasses.bar}`]: {
                    borderRadius: 5,
                  },
                }}
              />
            </div>
          </div>
     );
}
 
export default QuizUserCompleted;