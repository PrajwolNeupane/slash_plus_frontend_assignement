import * as y from "yup";

export const loginUserSchema = y.object({
  email: y.string().required("Please enter email"),
  code: y
    .string()
    .matches(/^\d{6}$/, "Code must be exactly 6 digits")
    .required("Code is required"),
});

export type LoginUserSchema = y.InferType<typeof loginUserSchema>;
