import { Divider, Skeleton } from "@mui/material";
import { FunctionComponent } from "react";

interface QuizSkeletonProps {}

const QuizSkeleton: FunctionComponent<QuizSkeletonProps> = () => {
  return (
    <div>
      <div className="flex flex-col justify-between gap-3 sm:gap-0 sm:flex-row">
        <div className="flex items-center gap-2">
          <Skeleton width={50} height={50} variant="circular" />
          <Skeleton width={230} height={40} variant="text" />
        </div>
        <Skeleton width={180} height={50} variant="rectangular" />
      </div>
      <Divider
        className="py-2"
        style={{ marginLeft: "-2rem", marginRight: "-2rem" }}
      />
      <div className="flex flex-col justify-between gap-3 mt-4 sm:flex-row sm:gap-0">
        <Skeleton variant="rectangular" width={200} height={50} />
        <div className="flex items-center gap-2">
          <Skeleton width={200} height={40} variant="rectangular" />
          <Skeleton width={50} height={50} variant="circular" />
        </div>
      </div>
      <div className="my-8">
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="20%" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton variant="rectangular" width="100%" height={50} />
        <Skeleton variant="rectangular" width="100%" height={50} />
      </div>
      <div className="flex justify-center mt-5">
        <Skeleton variant="rectangular" width="50%" height={50} />
      </div>
      <div className="flex justify-end mt-5">
        <Skeleton variant="rectangular" width={150} height={40} />
      </div>
      <div className="flex flex-col items-end mt-6">
        <Skeleton variant="text" width={100} />
        <Skeleton variant="text" width={160} />
      </div>
    </div>
  );
};

export default QuizSkeleton;
