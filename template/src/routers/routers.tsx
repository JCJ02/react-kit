import NotFound from "@/components/layouts/NotFound";
import ReactKit from "@/components/layouts/ReactKit";
import SignIn from "@/modules/auth/sign-in/sign-in";
import SignUp from "@/modules/auth/sign-up/sign-up";
import MyProfile from "@/modules/my-profile/my-profile";
import Dashboard from "@/modules/portal/dashboard/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<ReactKit />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
  );
};
