import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

interface AuthGoogleFacebookButtonsProps {
  onGoogleClicked: () => void;
  onFacebookClicked: () => void;
}

const AuthGoogleFacebookButtons: FunctionComponent<
  AuthGoogleFacebookButtonsProps
> = ({ onGoogleClicked, onFacebookClicked }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-2">
      <Button
        variant="contained"
        className="font-semibold text-black bg-text-primary hover:bg-text-primary hover:scale-105"
        startIcon={<FacebookIcon className="text-blue-800 " />}
        onClick={() => onFacebookClicked()}
      >
        Facebook
      </Button>
      <Button
        variant="contained"
        className="font-semibold text-black bg-text-primary hover:bg-text-primary hover:scale-105"
        startIcon={<GoogleIcon className="text-red-700" />}
        onClick={() => onGoogleClicked()}
      >
        Google
      </Button>
    </div>
  );
};

export default AuthGoogleFacebookButtons;
