import { Button, Divider, TextField, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { NextPage } from "next";
import Link from "next/link";
import { FORGOT_PASSWORD, SIGNUP } from "../../lib/constants/routes";
import { SubmitHandler, useForm } from "react-hook-form";

interface ILoginInput {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>();

  const formSubmitHandler: SubmitHandler<ILoginInput> = (data: ILoginInput) => {
    console.log(data);
    console.log(errors);
  };

  return (
    <div className="max-w-lg p-6">
      <div className="mb-8">
        <Typography className="mb-0" variant="h4">
          Login
        </Typography>
        <Typography color="text.disabled">
          Login with one of the following options
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
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <TextField
          label="Enter your email"
          error={!!errors.email}
          type="text"
          fullWidth
          variant="outlined"
          helperText={errors.email ? errors.email.message : null}
          {...register("email", {required: true})}
          className="mb-3 rounded-lg auth-border-disabled text-text-disabled border-text-disabled"
          sx={{
            " label": {
              color: "#ffffff80",
            },
            " fieldset": {
              borderColor: "#ffffff80",
            },
          }}
        />
        <TextField
          label="Enter your password"
          error={!!errors.password}
          type="password"
          fullWidth
          {...register("password")}
          className="mb-3 rounded-lg auth-border-disabled bg-background-paper text-text-disabled"
          sx={{
            " label": {
              color: "#ffffff80",
            },
          }}
        />
        <div className="flex justify-end mt-1 mb-4">
          <Link href={FORGOT_PASSWORD}>
            <a className="hover:scale-105">
              <Typography color="primary">Forgot password?</Typography>
            </a>
          </Link>
        </div>
        <Button variant="contained" color="secondary" fullWidth type="submit">
          Login
        </Button>
      </form>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <Typography>Not a member yet?</Typography>
        <Link href={SIGNUP}>
          <a className="text-teal-700 underline hover:scale-105">
            <Typography color="primary">Register Now</Typography>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Login;
