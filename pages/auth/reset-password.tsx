import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthHeading from "../../components/auth/AuthHeading";
import AuthInputField, {
  AuthInputFieldProps,
} from "../../components/auth/AuthInputField";
import AuthSubmitButton from "../../components/auth/AuthSubmitButton";
import { IResetPasswordInput } from "../../lib/data_types/interfaces";
import { resetPasswordInputSchema } from "../../lib/data_types/schemas";

const ResetPassword: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordInput>({
    resolver: yupResolver(resetPasswordInputSchema),
  });

  const formSubmitHandler: SubmitHandler<IResetPasswordInput> = (
    data: IResetPasswordInput
  ) => {
    console.log(data);
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
        <AuthSubmitButton title="Register" />
      </form>
    </div>
  );
};

export default ResetPassword;
