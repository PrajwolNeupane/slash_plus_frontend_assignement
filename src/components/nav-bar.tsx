import { Link } from "react-router-dom";
import { useAppSelector } from "@features/store/hooks";
import { useCallback } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function NavBar() {
  const user = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("issued_at");
    navigate("/login");
    toast.success("Logout Successfully");
  }, []);

  return (
    <div className="flex w-full items-center justify-between px-[8%] py-4 bg-gray-100 fixed top-0">
      <Link to={"/success"}>
        <h2 className="text-2xl font-semibold text-secondary leading-[90%]">
          Slash
          <br />
          <span className="text-primary">Assignment</span>
        </h2>
      </Link>
      <div className="flex items-center gap-20">
        <Link to={"/success"} className="text-primary font-medium">
          Dashboard
        </Link>
        <Link to={"/tech-stack"} className="text-primary font-medium">
          Tech Stack
        </Link>
        <div className="flex items-center gap-2">
          <img src={user?.photo!} className="w-10 rounded-full" />
          <div className="flex flex-col w-40">
            <h4 className="text-md line-clamp-1 text-primary ">{user.email}</h4>
            <h4
              className="text-primary font-medium cursor-pointer"
              onClick={logout}
            >
              Logout
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
