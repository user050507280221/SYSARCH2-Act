import { createBrowserRouter } from "react-router";
import Root from "./Root";
import { AdminPortal } from "./pages/AdminPortal";
import { TenantPortal } from "./pages/TenantPortal";
import { AdminDashboard } from "./components/AdminDashboard";
import { GenericPage } from "./pages/GenericPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        Component: AdminPortal,
        children: [
          {
            index: true,
            Component: AdminDashboard,
          },
          {
            path: ":pageId",
            Component: GenericPage,
          },
        ],
      },
      {
        path: "tenant",
        Component: TenantPortal,
      },
    ],
  },
]);
