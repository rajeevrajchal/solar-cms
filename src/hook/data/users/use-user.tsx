import UserService from "@api/services/user.service";
import useAuth from "@hook/store/use-auth";
import { USER } from "@model/user";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

const useUser = () => {
  const { loginUser } = useAuth();
  const { user_id } = useParams();

  const { pathname } = useLocation();

  const user = useQuery({
    queryKey: ["user.detail", user_id, loginUser.id],
    queryFn: () =>
      UserService.detail(
        pathname.includes("my-account") ? loginUser?.id : user_id || ""
      ),
    enabled: !!user_id || !!loginUser.id,
  });

  return {
    loading: user.isLoading || user.isFetching,
    error: user.error,
    user: user.data as USER,
  };
};

export default useUser;
