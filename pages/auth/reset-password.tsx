import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Snackbar } from "@mui/material";
import { NextPage } from "next";
import router from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthHeading from "../../components/auth/AuthHeading";
import AuthInputField, {
  AuthInputFieldProps,
} from "../../components/auth/AuthInputField";
import AuthSubmitButton from "../../components/auth/AuthSubmitButton";
import Layout from "../../components/shared/Layout";
import { LOGIN } from "../../lib/constants/routes";
import { useAuthContext } from "../../lib/data/contexts/AuthContext";
import { IResetPasswordInput } from "../../lib/data_types/interfaces";
import { resetPasswordInputSchema } from "../../lib/data_types/schemas";

const ResetPassword: NextPage = () => {
  const [openError, setOpenError] = useState<boolean>(false);
  const {
    confirmPasswordReset: { resetPassword, isComplete, loading, error },
  } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordInput>({
    resolver: yupResolver(resetPasswordInputSchema),
  });

  const formSubmitHandler: SubmitHandler<IResetPasswordInput> = async (
    data: IResetPasswordInput
  ) => {
    console.log(data);
    const query = router.query;
    console.log(query.oobCode);
    if (typeof query.oobCode === "string")
      await resetPassword(query.oobCode, data.password);
    if (isComplete) router.push(LOGIN);
  };

  const inputFieldsList: AuthInputFieldProps[] = [
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
          {error}
          {/* {error?.message} */}
        </Alert>
      </Snackbar>
    <Layout pageName="Reset password">
      <div className="flex items-center justify-center w-full">
        <div className="max-w-lg p-6">
          <AuthHeading title="Reset your password" />
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
            <AuthSubmitButton title="Reset" isLoading={loading} />
          </form>
        </div>
      </div>
    </Layout></>
  );
};

export default ResetPassword;
