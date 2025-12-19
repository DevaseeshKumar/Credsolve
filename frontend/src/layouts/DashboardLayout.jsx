import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <Navbar type="dashboard" />
      <Outlet />
      <Footer />
    </>
  );
}
