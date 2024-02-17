import NotFound from "@components/errors/not-found";
import { USER_ROLE } from "@enum/user.role";
import useAuth from "@hook/store/use-auth";
import { PropsWithChildren } from "react";

interface RoleRouteProps extends PropsWithChildren {
  allowed_role: USER_ROLE[] | "*";
}
const RoleRoute = (props: RoleRouteProps) => {
  const { allowed_role, children } = props;

  const { loginUser } = useAuth();

  const isAllowed = () => {
    if (allowed_role === "*") {
      return true;
    }
    if (allowed_role.includes(loginUser?.role?.toLowerCase() as USER_ROLE)) {
      return true;
    } else {
      return false;
    }
  };

  return isAllowed() ? children : <NotFound />;
};

export default RoleRoute;
