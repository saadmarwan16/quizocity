import { NextPage } from "next";
import { Button, Divider, TextField, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { LOGIN } from "../../lib/constants/routes";
import { StyledTextField } from "../../lib/styled/StyledTextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISignupInput } from "../../lib/data_types/interfaces";
import { signupInputSchema } from "../../lib/data_types/schemas";
import { yupResolver } from "@hookform/resolvers/yup";

const Signup: NextPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<ISignupInput>({
    resolver: yupResolver(signupInputSchema),
  });

  const formSubmitHandler: SubmitHandler<ISignupInput> = (data: ISignupInput) => {
    console.log(data);
  };

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
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <StyledTextField
          label="Enter your name"
          error={!!errors.name}
          type="text"
          fullWidth
          helperText={errors.name ? errors.name.message : null}
          {...register('name')}
          className="mb-3"
        />
        <StyledTextField
          label="Enter your email"
          error={!!errors.email}
          type="email"
          fullWidth
          helperText={errors.email ? errors.email.message : null}
          {...register('email')}
          className="mb-3"
        />
        <StyledTextField
          label="Pick a strong password"
          error={!!errors.password}
          type="password"
          fullWidth
          helperText={errors.password ? errors.password.message : null}
          {...register('password')}
          className="mb-3"
        />
        <StyledTextField
          label="Enter password again"
          error={!!errors.confirm}
          type="password"
          fullWidth
          helperText={errors.confirm ? errors.confirm.message : null}
          {...register('confirm')}
          className="mb-3"
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          fullWidth
          className="mt-6"
        >
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
