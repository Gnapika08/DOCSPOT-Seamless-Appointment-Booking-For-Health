import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .nullable(),
  password: Yup.string()
    .required("Password is required")
    .nullable(),
});
