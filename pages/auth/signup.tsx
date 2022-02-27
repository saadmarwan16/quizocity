import { NextPage } from "next";
import { Typography } from "@mui/material";

import Link from "next/link";
import { LOGIN } from "../../lib/constants/routes";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISignupInput } from "../../lib/data_types/interfaces";
import { signupInputSchema } from "../../lib/data_types/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthHeading from "../../components/auth/AuthHeading";
import AuthGoogleFacebookButtons from "../../components/auth/AuthGoogleFacebookButtons";
import AuthOptionsDivider from "../../components/auth/AuthOptionsDivider";
import AuthInputField, {
  AuthInputFieldProps,
} from "../../components/auth/AuthInputField";
import AuthSubmitButton from "../../components/auth/AuthSubmitButton";

const Signup: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupInput>({
    resolver: yupResolver(signupInputSchema),
  });

  const formSubmitHandler: SubmitHandler<ISignupInput> = (
    data: ISignupInput
  ) => {
    console.log(data);
  };

  const inputFieldsList: AuthInputFieldProps[] = [
    {
      label: "Enter your name",
      error: !!errors.name,
      type: "text",
      helperText: errors.name ? errors.name.message : null,
      fieldName: () => register("name"),
    },
    {
      label: "Enter your email",
      error: !!errors.email,
      type: "email",
      helperText: errors.email ? errors.email.message : null,
      fieldName: () => register("email"),
    },
    {
      label: "Pick a strong password",
      error: !!errors.password,
      type: "password",
      helperText: errors.password ? errors.password.message : null,
      fieldName: () => register("password"),
    },
    {
      label: "Enter password again",
      error: !!errors.confirm,
      type: "password",
      helperText: errors.confirm ? errors.confirm.message : null,
      fieldName: () => register("confirm"),
    },
  ];

  return (
    <div className="max-w-lg p-6">
      <AuthHeading
        title="Register"
        subtitle="Register with one of the following options"
      />
      <AuthGoogleFacebookButtons
        onGoogleClicked={() => console.log("signup, google")}
        onFacebookClicked={() => console.log("signup, facebook")}
      />
      <AuthOptionsDivider />
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        {inputFieldsList.map((inputField, index) => (
          <AuthInputField
            key={index}
            label={inputField.label}
            error={inputField.error}
            type={inputField.type}
            helperText={inputField.helperText}
            fieldName={() => inputField.fieldName()}
          />
        ))}
        <AuthSubmitButton title="Register" />
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
