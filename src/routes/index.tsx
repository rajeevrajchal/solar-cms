import { Route, Routes } from "react-router-dom";
import AppRoute from "./route.constant";
import DashboardLayout from "@layout/dashboard.layout";
import AuthRoute from "./auth.route";
import Home from "@module/home";
import Projects from "@module/project";
import { USER_ROLE } from "@enum/user.role";
import useAuth from "@hook/store/use-auth";
import Login from "@module/auth/login";
import AuthLayout from "@layout/auth.layout";
import Customer from "@module/customer";
import ElectricLoadProject from "@module/public/electric-load-project";
import BlankLayout from "@layout/blank.layout";
import Inventory from "@module/inventory";
import NotFound from "@components/errors/not-found";
import Quote from "@module/quote";
import User from "@module/user";
import UserDetailLayout from "@module/user/layout/user-detail-layout";
import Vendor from "@module/vendors";

const AppRoutes = () => {
  const { loginUser } = useAuth();

  return (
    <Routes>
      <Route
        path={AppRoute.home}
        element={
          <AuthRoute isPublic={false} isAuth>
            <DashboardLayout />
          </AuthRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path={`${AppRoute.projects}/*`} element={<Projects />} />
        <Route path={`${AppRoute.inventory}/*`} element={<Inventory />} />
        <Route path={`${AppRoute.vendor}/*`} element={<Vendor />} />
        <Route path={`${AppRoute.quote}/*`} element={<Quote />} />

        {/* admin & sales */}
        {[USER_ROLE.ADMIN, USER_ROLE.SALE, USER_ROLE.ENGINEER].includes(
          loginUser?.role?.toLowerCase() as USER_ROLE
        ) && (
          <>
            <Route path={`${AppRoute.customers}/*`} element={<Customer />} />
          </>
        )}

        {/* admin */}
        {[USER_ROLE.ADMIN].includes(
          loginUser?.role?.toLowerCase() as USER_ROLE
        ) && (
          <>
            <Route path={`${AppRoute.users}/*`} element={<User />} />
          </>
        )}

        <Route path="my-account" element={<UserDetailLayout />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* public url */}
      <Route path={AppRoute.home} element={<BlankLayout />}>
        <Route
          path={`${AppRoute.electric_load_public}`}
          element={<ElectricLoadProject />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route
        path={AppRoute.home}
        element={
          <AuthRoute isPublic isAuth={false}>
            <AuthLayout />
          </AuthRoute>
        }
      >
        <Route path={`${AppRoute.login}`} element={<Login />} />
        <Route path={`${AppRoute.forget_password}`} element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
