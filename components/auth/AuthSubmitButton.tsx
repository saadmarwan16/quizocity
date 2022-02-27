import { Button } from "@mui/material";
import { FunctionComponent } from "react";

interface AuthSubmitButtonProps {
  title: string;
}

const AuthSubmitButton: FunctionComponent<AuthSubmitButtonProps> = ({
  title,
}) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      type="submit"
      fullWidth
      className="mt-6"
    >
      {title}
    </Button>
  );
};

export default AuthSubmitButton;
