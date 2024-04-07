import NotFound from "@components/errors/not-found";
import { USER_ROLE } from "@enum/user.role";
import AuthLayout from "@layout/auth.layout";
import BlankLayout from "@layout/blank.layout";
import DashboardLayout from "@layout/dashboard.layout";
import AppConfig from "@module/app_config";
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
import Services from "@module/services";
import User from "@module/user";
import Vendor from "@module/vendors";
import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./auth.route";
import MyAccountRoute from "./my-account-route";
import RoleRoute from "./role.route";
import AppRoute from "./route.constant";

type ROUTE = {
  path: string;
  component?: () => JSX.Element;
  layout: ReactElement;
  isPublic: boolean;
  isAuth: boolean;
  children: {
    path: string;
    component: () => JSX.Element;
    allowedRoles: USER_ROLE[] | "*";
  }[];
};

const routes: ROUTE[] = [
  {
    path: AppRoute.home,
    layout: <DashboardLayout />,
    isPublic: false,
    isAuth: true,
    component: Home,
    children: [
      {
        path: `${AppRoute.projects}/*`,
        component: Projects,
        allowedRoles: "*",
      },
      {
        path: `${AppRoute.services}/*`,
        component: Services,
        allowedRoles: "*",
      },
      { path: `${AppRoute.quote}/*`, component: Quote, allowedRoles: "*" },
      { path: `${AppRoute.order}/*`, component: Order, allowedRoles: "*" },
      {
        path: `${AppRoute.inventory}/*`,
        component: Inventory,
        allowedRoles: "*",
      },
      { path: `${AppRoute.vendor}/*`, component: Vendor, allowedRoles: "*" },
      {
        path: `${AppRoute.app_config}/*`,
        component: AppConfig,
        allowedRoles: "*",
      },
      {
        path: `${AppRoute.customers}/*`,
        component: Customer,
        allowedRoles: "*",
      },
      {
        path: `${AppRoute.my_account}/*`,
        component: MyAccountRoute,
        allowedRoles: "*",
      },
      {
        path: `${AppRoute.users}/*`,
        component: User,
        allowedRoles: [USER_ROLE.ADMIN],
      },
    ],
  },
  {
    path: AppRoute.home,
    layout: <AuthLayout />,
    isPublic: true,
    isAuth: false,
    children: [
      { path: AppRoute.login, component: Login, allowedRoles: "*" },
      {
        path: AppRoute.forget_password,
        component: ForgetPassword,
        allowedRoles: "*",
      },
      {
        path: AppRoute.reset_password,
        component: ResetPassword,
        allowedRoles: "*",
      },
    ],
  },
  {
    path: AppRoute.home,
    layout: <BlankLayout />,
    isPublic: true,
    isAuth: false,
    children: [
      {
        path: "electric_load_public",
        component: ElectricLoadProject,
        allowedRoles: "*",
      },
    ],
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <AuthRoute isPublic={route.isPublic} isAuth={route.isAuth}>
              {route.layout}
            </AuthRoute>
          }
        >
          {route.component && <Route index element={<route.component />} />}
          {route.children &&
            route.children.map((child, childIndex) => (
              <Route
                key={childIndex}
                path={`${route.path}/${child.path}`}
                element={
                  <RoleRoute allowed_role={child.allowedRoles}>
                    <child.component />
                  </RoleRoute>
                }
              />
            ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      ))}
    </Routes>
  );
};

export default AppRoutes;
