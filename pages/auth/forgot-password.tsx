import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthHeading from "../../components/auth/AuthHeading";
import AuthInputField from "../../components/auth/AuthInputField";
import AuthSubmitButton from "../../components/auth/AuthSubmitButton";
import Layout from "../../components/shared/Layout";
import { LOGIN, RESET_PASSWORD } from "../../lib/constants/routes";
import { IForgotPasswordInput } from "../../lib/data_types/interfaces";
import { forgotPasswordInputSchema } from "../../lib/data_types/schemas";

const ForgotPassword: NextPage = () => {
  const [isInstructionsSent, setIsInstructionsSent] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordInput>({
    resolver: yupResolver(forgotPasswordInputSchema),
  });

  const formSubmitHandler: SubmitHandler<IForgotPasswordInput> = (
    data: IForgotPasswordInput
  ) => {
    console.log(data);
    setIsInstructionsSent(true);
  };

  return (
    <Layout pageName="Forgot password">
      <div className="flex items-center justify-center w-full">
        <div className="max-w-lg p-6">
          {isInstructionsSent ? (
            <>
              <AuthHeading
                title="Email instructions sent"
                subtitle="Please follow the instructions we sent to your inbox."
              />
              <Link href={RESET_PASSWORD}>
                <a>Go to reset password</a>
              </Link>
            </>
          ) : (
            <>
              <AuthHeading
                title="Forgot Password?"
                subtitle="Please enter your registered email address. We will send
              instructions to help reset your password."
              />
              <form onSubmit={handleSubmit(formSubmitHandler)}>
                <AuthInputField
                  label="Enter your email"
                  error={!!errors.email}
                  type="text"
                  helperText={errors.email ? errors.email.message : null}
                  fieldName={() => register("email")}
                />
                <div className="flex justify-end mt-1 mb-4">
                  <Link href={LOGIN}>
                    <a className="hover:scale-105">
                      <Typography color="primary">Not you?</Typography>
                    </a>
                  </Link>
                </div>
                <AuthSubmitButton title="Send instructions" />
              </form>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
