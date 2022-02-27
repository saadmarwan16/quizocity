import { Divider, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface AuthOptionsDividerProps {}

const AuthOptionsDivider: FunctionComponent<AuthOptionsDividerProps> = () => {
  return (
    <div className="flex items-center justify-center gap-2 pt-4 mb-4">
      <Divider className="w-10 bg-text-disabled" style={{ height: "1px" }} />
      <Typography>OR</Typography>
      <Divider className="w-10 bg-text-disabled" style={{ height: "1px" }} />
    </div>
  );
};

export default AuthOptionsDivider;
