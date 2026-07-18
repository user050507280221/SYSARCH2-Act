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
        // Removing 'index: true' or 'path' here turns this into a clean pathless layout route
        Component: AdminPortal,
        children: [
          {
            index: true, // This correctly handles the default homepage view inside the portal
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
], {
  basename: "/SYSARCH2-Act",
});