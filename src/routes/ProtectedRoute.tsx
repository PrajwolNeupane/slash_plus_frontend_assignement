import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

type AuthRouteProps = {
  page: JSX.Element;
};

const Protected = ({ page }: AuthRouteProps) => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div>{page}</div>
    </>
  );
};

export default Protected;
