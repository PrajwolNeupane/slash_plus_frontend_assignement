import { LoginUserSchema } from "@features/schema/login-user.schema";
import { api } from "../../api";
import { LoginResponse } from "./auth.type";

const baseEnd = "/auth";

export const useLogin = async (body: LoginUserSchema) => {
  const response = await api.post<LoginResponse, LoginUserSchema>(
    `${baseEnd}/login`,
    body
  );
  return response.data;
};

export const useProfile = async () => {
  console.log("--Calling useProfile--");
  const response = await api.get<any>(`${baseEnd}`);
  return response.data;
};
