import Splash from "@components/splash";
import useAuth from "@hook/store/use-auth";
import { Navigate, useLocation } from "react-router-dom";
import AppRoute from "./route.constant";

interface AuthRouteProps {
  children: JSX.Element;
  isPublic: boolean;
  isAuth: boolean;
}

function AuthRoute(props: AuthRouteProps) {
  const { children, isPublic, isAuth } = props;
  const location: {
    state: {
      from: {
        pathname: string;
      };
    };
  } = useLocation();

  const { isLoggedIn, loading } = useAuth();

  const privatePathNavigation: string = location.state
    ? location.state.from.pathname
    : AppRoute.home;

  const publicPathNavigation: string = location.state
    ? location.state.from.pathname
    : AppRoute.login;

  if (loading) {
    return <Splash />;
  }

  if (isPublic && isLoggedIn && !loading) {
    return (
      <Navigate
        to={privatePathNavigation}
        state={{
          from: location,
        }}
      />
    );
  }

  if (!isLoggedIn && !loading && isAuth) {
    return (
      <Navigate
        to={publicPathNavigation}
        state={{
          from: location,
        }}
      />
    );
  }

  return children;
}

export default AuthRoute;
