import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import useProfileStatus from "@hooks/useAuth";
import NavBar from "@components/nav-bar";

const Protected = () => {
  const refreshToken = Cookies.get("refresh_token");

  if (!refreshToken) {
    console.log("--Going Login--");
    return <Navigate to="/login" />;
  }

  useProfileStatus();

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Protected;
