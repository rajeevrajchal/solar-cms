import { Route, Routes } from "react-router-dom";
import AppRoute from "./route.constant";
import DashboardLayout from "@layout/dashboard.layout";
import AuthRoute from "./auth.route";
import Home from "@module/home";
import Projects from "@module/project";
import { USER_ROLE } from "@enum/user.role";
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
import RoleRoute from "./role.route";

const AppRoutes = () => {
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
        <Route
          path={`${AppRoute.projects}/*`}
          element={
            <RoleRoute allowed_role="*">
              <Projects />
            </RoleRoute>
          }
        />
        <Route
          path={`${AppRoute.inventory}/*`}
          element={
            <RoleRoute allowed_role="*">
              <Inventory />
            </RoleRoute>
          }
        />
        <Route
          path={`${AppRoute.vendor}/*`}
          element={
            <RoleRoute allowed_role="*">
              <Vendor />
            </RoleRoute>
          }
        />
        <Route
          path={`${AppRoute.quote}/*`}
          element={
            <RoleRoute allowed_role="*">
              <Quote />
            </RoleRoute>
          }
        />
        <Route
          path="my-account"
          element={
            <RoleRoute allowed_role="*">
              <UserDetailLayout />
            </RoleRoute>
          }
        />

        <Route
          path={`${AppRoute.inventory}/*`}
          element={
            <RoleRoute allowed_role={[USER_ROLE.ADMIN, USER_ROLE.SALE]}>
              <Inventory />
            </RoleRoute>
          }
        />
        <Route
          path={`${AppRoute.vendor}/*`}
          element={
            <RoleRoute allowed_role={[USER_ROLE.ADMIN, USER_ROLE.SALE]}>
              <Vendor />
            </RoleRoute>
          }
        />
        <Route
          path={`${AppRoute.customers}/*`}
          element={
            <RoleRoute allowed_role="*">
              <Customer />
            </RoleRoute>
          }
        />
        <Route
          path={`${AppRoute.users}/*`}
          element={
            <RoleRoute allowed_role={[USER_ROLE.ADMIN]}>
              <User />
            </RoleRoute>
          }
        />
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
