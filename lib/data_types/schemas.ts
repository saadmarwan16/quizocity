import * as yup from "yup";

export const loginInputSchema = yup
  .object({
    email: yup
      .string()
      .email("Field must be a valid email")
      .required("Field is required"),
    password: yup
      .string()
      .required("Field is required")
      .min(8, "Must be 8 or more characters"),
  })
  .required();

export const signupInputSchema = yup
  .object({
    name: yup.string().required("Field is required"),
    email: yup
      .string()
      .email("Field must be a valid email")
      .required("Field is required"),
    password: yup
      .string()
      .required("Field is required")
      .min(8, "Must be 8 or more characters"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();
