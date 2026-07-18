import { Outlet } from "react-router";
import { Toaster } from "./components/ui/sonner";

export default function Root() {
  return (
    <div className="size-full">
      <Toaster />
      <Outlet />
    </div>
  );
}
