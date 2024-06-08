import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@features/store/hooks";
import { setUser } from "../features/slices/auth";
import { useProfile } from "@features/service/auth/auth.api";

function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: user } = useQuery({
    queryKey: ["user-profile"],
    queryFn: useProfile,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (user) {
      switch ((user as any).title) {
        case "Forbidden":
          navigate("/login");
          break;
        case "Server Error":
          navigate("/login");
          break;
        default:
          dispatch(setUser(user.data?.[0]));
          return;
      }
    }
  }, [user]);

  return;
}

export default useAuth;
