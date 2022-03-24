import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { FORGOT_PASSWORD, HOME, SIGNUP } from "../../lib/constants/routes";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginInput } from "../../lib/data_types/interfaces";
import { loginInputSchema } from "../../lib/data_types/schemas";
import AuthGoogleFacebookButtons from "../../components/auth/AuthGoogleFacebookButtons";
import AuthHeading from "../../components/auth/AuthHeading";
import AuthOptionsDivider from "../../components/auth/AuthOptionsDivider";
import AuthInputField, {
  AuthInputFieldProps,
} from "../../components/auth/AuthInputField";
import AuthSubmitButton from "../../components/auth/AuthSubmitButton";
import Layout from "../../components/shared/Layout";
import { useAuthContext } from "../../lib/data/contexts/AuthContext";
import router from "next/router";
import { useState } from "react";

const Login: NextPage = () => {
  const [openError, setOpenError] = useState<boolean>(false);
  const {
    authState: [user],
    loginWithEmailAndPassword: [login, _, loading, error],
    loginWithGoogle: [googleLogin],
    loginWithFacebook: [facebookLogin],
  } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({
    resolver: yupResolver(loginInputSchema),
  });
  const formSubmitHandler: SubmitHandler<ILoginInput> = async (
    data: ILoginInput
  ) => {
    await login(data.email, data.password);
    if (error) setOpenError(true);
  };

  const inputFieldsList: AuthInputFieldProps[] = [
    {
      label: "Enter your email",
      error: !!errors.email,
      type: "text",
      helperText: errors.email ? errors.email.message : null,
      fieldName: () => register("email"),
    },
    {
      label: "Enter your password",
      error: !!errors.password,
      type: "password",
      helperText: errors.password ? errors.password.message : null,
      fieldName: () => register("password"),
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
      <Layout pageName="Login">
        <div className="flex items-center justify-center w-full">
          <div className="max-w-lg p-6">
            <AuthHeading
              title="Login"
              subtitle="Login with one of the following options"
            />
            <AuthGoogleFacebookButtons
              onGoogleClicked={() => googleLogin()}
              onFacebookClicked={() => facebookLogin()}
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
                  fieldName={inputField.fieldName}
                />
              ))}
              <div className="flex justify-end mt-1 mb-4">
                <Link href={FORGOT_PASSWORD}>
                  <a className="hover:scale-105">
                    <Typography color="primary">Forgot password?</Typography>
                  </a>
                </Link>
              </div>
              <AuthSubmitButton title="Login" isLoading={loading} />
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
        </div>
      </Layout>
    </>
  );
};

export default Login;
