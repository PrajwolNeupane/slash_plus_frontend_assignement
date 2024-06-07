import instance from "../baseUrl";

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
  let customHeaders: Record<string, string> = {};
  let accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    return customHeaders;
  }

  if (isAccessTokenExpired()) {
    const newToken = await getNewAccessToken();
    customHeaders.Authorization = `Bearer ${
      newToken.access || localStorage.getItem("access_token")
    }`;
  } else {
    customHeaders.Authorization = `Bearer ${accessToken}`;
  }

  return customHeaders;
};

// Get a new access token ==============
// =====================================
const getNewAccessToken = async (): Promise<Token> => {
  const response = await instance.post<any>(
    "/school/refresh",
    {
      refresh: localStorage.getItem("refresh_token"),
    },
    { withCredentials: true }
  );

  //set tokens to local storage
  localStorage.setItem("access_token", response.data.access!);
  localStorage.setItem("issued_at", Date.now().toString());
  localStorage.setItem("refresh_token", response.data.refresh!);

  return response.data;
};

// Function to check if access token is expired or not ========
// ==================================================
const isAccessTokenExpired = (): boolean => {
  const issuedAt = Number(localStorage.getItem("issued_at"));
  const expirationTime = issuedAt + 3600 * 1000;
  const currentTime = Date.now();

  return currentTime > expirationTime;
};
