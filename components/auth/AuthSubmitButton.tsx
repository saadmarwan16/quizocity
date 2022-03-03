import { Button, CircularProgress } from "@mui/material";
import { FunctionComponent } from "react";

interface AuthSubmitButtonProps {
  title: string;
  isLoading: boolean;
}

const AuthSubmitButton: FunctionComponent<AuthSubmitButtonProps> = ({
  title,
  isLoading
}) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      type="submit"
      fullWidth
      className="mt-6"
      disabled={isLoading}
    >
      {isLoading ? <CircularProgress /> : title}
    </Button>
  );
};

export default AuthSubmitButton;
