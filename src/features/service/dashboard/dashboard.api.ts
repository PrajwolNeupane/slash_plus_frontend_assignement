import { api } from "../../api";
import { DashboardResponse } from "./dashboard.type";

const baseEnd = "/dashboard";

export const useDashboard = async () => {
  const response = await api.get<DashboardResponse>(`${baseEnd}`);
  return response.data;
};
