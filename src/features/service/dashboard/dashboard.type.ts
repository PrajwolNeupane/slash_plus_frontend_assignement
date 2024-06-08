export interface DashboardResponse {
  success: boolean;
  message?: string;
  data?: Data;
  error?: string;
}

export interface Data {
  userCount: number;
  loginCount: number;
  log: Log[];
}

export interface Log {
  _id: string;
  action: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}
