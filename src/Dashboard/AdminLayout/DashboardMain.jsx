import { Outlet } from "react-router-dom";
import AdminNavbar from "../AdminPages/SharedPages/AdminNavbar/AdminNavbar";
import ScrollToTop from "react-scroll-to-top";
import { BiArrowToTop } from "react-icons/bi";

const DashboardMain = () => {
  return (
    <div className="">
      <AdminNavbar></AdminNavbar>
      
      <Outlet></Outlet>

      <ScrollToTop
        data-aos="fade-up"
        smooth
        component={<BiArrowToTop className="text-white text-3xl" />}
        className=" !bg-[#ff3811] shadow-lg !rounded-full flex items-center justify-center !w-10 !h-10 !fixed !right-1 md:!bottom-10 !bottom-[70px]"
      />
    </div>
  );
};

export default DashboardMain;
