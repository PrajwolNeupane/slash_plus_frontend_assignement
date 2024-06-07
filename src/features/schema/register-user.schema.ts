import * as y from "yup";

export const registerUserSchema = y.object({
  email: y.string().required("Please enter email"),
  code: y
    .string()
    .matches(/^\d{6}$/, "Code must be exactly 6 digits")
    .required("Code is required"),
});

export type RegisterUserSchema = y.InferType<typeof registerUserSchema>;
