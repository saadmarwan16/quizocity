import { Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface AuthHeadingProps {
  title: string;
  subtitle?: string;
}

const AuthHeading: FunctionComponent<AuthHeadingProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="mb-8">
      <Typography className="mb-0" variant="h4">
        {title}
      </Typography>
      <Typography color="text.disabled">{subtitle}</Typography>
    </div>
  );
};

export default AuthHeading;
