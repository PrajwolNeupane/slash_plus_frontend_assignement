import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const AuthenticatedRoute = () => {
  const refreshToken = Cookies.get("refresh_token");

  if (refreshToken) {
    return <Navigate to="/success" />;
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
