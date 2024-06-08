import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@features/store/hooks";
import { useCallback } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logOut } from "@features/slices/auth";
import { CustomButton } from "./shared";

export default function NavBar() {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = useCallback(() => {
    dispatch(logOut());
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("issued_at");
    navigate("/login");
    toast.success("Logout Successfully");
  }, []);

  return (
    <div className="flex rg:flex-row gap-2 flex-col w-full items-center justify-between 2xl:px-[8%] lg:px-[5%] px-[3%] py-4 bg-gray-100 fixed top-0">
      <Link to={"/success"}>
        <h2 className="lg:text-2xl text-xl font-semibold text-secondary leading-[90%]">
          Slash
          <br />
          <span className="text-primary">Assignment</span>
        </h2>
      </Link>
      <div className="flex items-center lg:gap-10 sm:gap-6 gap-3">
        <Link
          to={"/success"}
          className="text-primary font-medium lg:text-base sm:text-md text-xs"
        >
          Dashboard
        </Link>
        <Link
          to={"https://prajwolneupane.com.np"}
          target="blank"
          className="text-primary font-medium lg:text-base sm:text-md text-xs"
        >
          About Developer
        </Link>
        <CustomButton
          text="Logout"
          className="sm:w-20 w-5 sm:text-sm text-xs rg:hidden block"
          onClick={logoutHandler}
        />
        <div className="items-center gap-2 rg:flex hidden">
          <img src={user?.photo!} className="w-10 rounded-full" />
          <div className="flex flex-col w-40">
            <h4 className="lg:text-md text-sm line-clamp-1 text-primary ">
              {user.email}
            </h4>
            <h4
              className="text-primary font-medium cursor-pointer lg:text-base text-md"
              onClick={logoutHandler}
            >
              Logout
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
