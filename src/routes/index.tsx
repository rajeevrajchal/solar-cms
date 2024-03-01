import NotFound from "@components/errors/not-found";
import { USER_ROLE } from "@enum/user.role";
import AuthLayout from "@layout/auth.layout";
import BlankLayout from "@layout/blank.layout";
import DashboardLayout from "@layout/dashboard.layout";
import ForgetPassword from "@module/auth/views/forget-password";
import Login from "@module/auth/views/login";
import ResetPassword from "@module/auth/views/reset-password";
import Customer from "@module/customer";
import Home from "@module/home";
import Inventory from "@module/inventory";
import Order from "@module/order";
import Projects from "@module/project";
import ElectricLoadProject from "@module/public/electric-load-project";
import Quote from "@module/quote";
import User from "@module/user";
import UserDetailLayout from "@module/user/layout/user-detail-layout";
import Vendor from "@module/vendors";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./auth.route";
import RoleRoute from "./role.route";
import AppRoute from "./route.constant";

const AppRoutes = () => {
  return (
    <Routes>
      {/* dashboard route */}
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
        {/* <Route
          path={`${AppRoute.services}/*`}
          element={
            <RoleRoute allowed_role="*">
              <Services />
            </RoleRoute>
          }
        /> */}
        <Route
          path={`${AppRoute.order}/*`}
          element={
            <RoleRoute allowed_role="*">
              <Order />
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

      {/* auth route */}
      <Route
        path={AppRoute.home}
        element={
          <AuthRoute isPublic isAuth={false}>
            <AuthLayout />
          </AuthRoute>
        }
      >
        <Route path={`${AppRoute.login}`} element={<Login />} />
        <Route
          path={`${AppRoute.forget_password}`}
          element={<ForgetPassword />}
        />
        <Route
          path={`${AppRoute.reset_password}`}
          element={<ResetPassword />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* public route */}
      <Route path={AppRoute.home} element={<BlankLayout />}>
        <Route
          path={`${AppRoute.electric_load_public}`}
          element={<ElectricLoadProject />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
