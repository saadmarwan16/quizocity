import { NextPage } from "next";
import { Button, Divider, TextField, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { LOGIN } from "../../lib/constants/routes";

const Signup: NextPage = () => {
  return (
    <div className="max-w-lg p-6">
      <div className="mb-8">
        <Typography className="mb-0" variant="h4">
          Register
        </Typography>
        <Typography color="text.disabled">
          Register with one of the following options
        </Typography>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-2">
        <Button
          variant="contained"
          className="font-semibold text-black bg-text-primary hover:bg-text-primary hover:scale-105"
          startIcon={<FacebookIcon className="text-blue-800 " />}
        >
          Facebook
        </Button>
        <Button
          variant="contained"
          className="font-semibold text-black bg-text-primary hover:bg-text-primary hover:scale-105"
          startIcon={<GoogleIcon className="text-red-700" />}
        >
          Google
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2 pt-4 mb-4">
        <Divider className="w-10 bg-text-disabled" style={{ height: "1px" }} />
        <Typography>OR</Typography>
        <Divider className="w-10 bg-text-disabled" style={{ height: "1px" }} />
      </div>
      <form>
        <TextField
          label="Enter your name"
          error={false}
          type="text"
          fullWidth
          className="mb-3 rounded-lg auth-border-disabled bg-background-paper text-text-disabled"
          sx={{
            " label": {
              color: "#ffffff80",
            },
          }}
        />
        <TextField
          label="Enter your email"
          error={false}
          type="email"
          fullWidth
          className="mb-3 rounded-lg auth-border-disabled bg-background-paper text-text-disabled"
          sx={{
            " label": {
              color: "#ffffff80",
            },
          }}
        />
        <TextField
          label="Pick a strong password"
          error={false}
          type="password"
          fullWidth
          className="mb-3 rounded-lg auth-border-disabled bg-background-paper text-text-disabled"
          sx={{
            " label": {
              color: "#ffffff80",
            },
          }}
        />
        <TextField
          label="Enter password again"
          error={false}
          type="password"
          fullWidth
          className="mb-3 rounded-lg auth-border-disabled bg-background-paper text-text-disabled"
          sx={{
            " label": {
              color: "#ffffff80",
            },
          }}
        />
        <Button variant="contained" color="secondary" type="submit" fullWidth className="mt-6">
          Register
        </Button>
      </form>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <Typography>Already a member?</Typography>
        <Link href={LOGIN}>
          <a className="text-teal-700 underline hover:scale-105">
            <Typography color="primary">Login Now</Typography>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
