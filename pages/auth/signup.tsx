import { NextPage } from "next";
import { Alert, Snackbar, Typography } from "@mui/material";

import Link from "next/link";
import { HOME, LOGIN } from "../../lib/constants/routes";
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
import Layout from "../../components/shared/Layout";
import { useAuthContext } from "../../lib/data/contexts/AuthContext";
import router from "next/router";
import { useState } from "react";

const Signup: NextPage = () => {
  const [openError, setOpenError] = useState<boolean>(false);
  const {
    authState: [user],
    registerWithEmailAndPassword: [createUser, _, loading, error],
  } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupInput>({
    resolver: yupResolver(signupInputSchema),
  });
  const formSubmitHandler: SubmitHandler<ISignupInput> = async (
    data: ISignupInput
  ) => {
    await createUser(data.email, data.password);
    if (error) setOpenError(true);
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

  if (typeof window !== "undefined" && user) router.push(HOME);

  return (
    <>
      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={() => setOpenError(false)}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error?.message}
        </Alert>
      </Snackbar>
      <Layout pageName="Register">
        <div className="flex items-center justify-center w-full">
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
              <AuthSubmitButton title="Register" isLoading={loading} />
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
        </div>
      </Layout>
    </>
  );
};

export default Signup;
