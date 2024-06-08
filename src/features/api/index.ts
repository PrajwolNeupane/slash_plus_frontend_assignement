import { GetAccessTokenResponse } from "@features/service/auth/auth.type";
import instance from "../baseUrl";
import Cookies from "js-cookie";

type Token = {
  access: string | null;
  refresh: string | null;
};

export const api = {
  get: async <T>(endpoint: string, params?: object) => {
    const headers = await getHeadersWithAccessToken();
    return instance.get<T>(endpoint, {
      params,
      headers,
      withCredentials: true,
    });
  },
  post: async <T, S>(endpoint: string, body: S, headers?: object) => {
    const customHeaders = await getHeadersWithAccessToken();
    return instance.post<T>(endpoint, body, {
      headers: { ...customHeaders, ...headers },
      withCredentials: true,
    });
  },
  put: async <T, S>(endpoint: string, body: S, headers?: object) => {
    const customHeaders = await getHeadersWithAccessToken();
    return instance.put<T>(endpoint, body, {
      headers: { ...customHeaders, ...headers },
      withCredentials: true,
    });
  },
  delete: async <T>(endpoint: string, headers?: object) => {
    const customHeaders = await getHeadersWithAccessToken();
    return instance.delete<T>(endpoint, {
      headers: { ...customHeaders, ...headers },
      withCredentials: true,
    });
  },
};

// Function to get headers with access token
const getHeadersWithAccessToken = async (): Promise<object> => {
  console.log("--Calling getHeadersWithAccessToken--");
  let customHeaders: Record<string, string> = {};
  let accessToken = Cookies.get("access_token");
  if (!accessToken || isAccessTokenExpired()) {
    const newToken = await getNewAccessToken();
    customHeaders.Authorization = `Bearer ${
      newToken.access || Cookies.get("access_token")
    }`;
  } else {
    customHeaders.Authorization = `Bearer ${accessToken}`;
  }

  return customHeaders;
};

// Get a new access token ==============
// =====================================
const getNewAccessToken = async (): Promise<Token> => {
  console.log("--Calling getNewAccessToken--");
  let customHeaders: Record<string, string> = {};
  let refreshToken = Cookies.get("refresh_token");
  if (refreshToken) {
    customHeaders.Authorization = `Bearer ${refreshToken}`;
    const response = await instance.get<GetAccessTokenResponse>(
      "/auth/refresh",
      {
        withCredentials: true,
        headers: customHeaders,
      }
    );
    //set tokens to cookie
    Cookies.set("access_token", response.data?.accessToken!);
    Cookies.set("refresh_token", response.data?.refreshToken!);
    Cookies.set("issued_at", Date.now().toString());

    return {
      access: response.data?.accessToken,
      refresh: response.data?.refreshToken,
    };
  }
  return {
    access: "",
    refresh: "",
  };
};
const isAccessTokenExpired = (): boolean => {
  const issuedAt = Number(Cookies.get("issued_at"));
  const expirationTime = issuedAt + 1800 * 1000;
  const currentTime = Date.now();

  return currentTime > expirationTime;
};
