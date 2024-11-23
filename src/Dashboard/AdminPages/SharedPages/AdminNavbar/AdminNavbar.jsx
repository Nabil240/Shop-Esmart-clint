import { RiMenuLine } from "react-icons/ri";
import NavDarkMode from "../../../../Pages/Shared/Navbar/NavDarkMode";
import AdminNavMenu from "./AdminNavMenu";
import NavLoginOrLogout from "../../../../Pages/Shared/Navbar/NavLoginOrLogout";

const AdminNavbar = () => {
  return (
    <div className="flex justify-between items-center px-2 bg-gray-300 dark:bg-gray-600 md:h-16 h-10  gap-2">
      <div className="">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content ">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="text-3xl text-[#ff3811] font-bold cursor-pointer">
              <RiMenuLine />
            </label>
          </div>
          <AdminNavMenu />
        </div>
      </div>
      <div>
        <h2 className="text-xl md:text-3xl">Admin Pannel</h2>
      </div>
      <div className="flex items-center gap-3">
        <NavDarkMode />
        <NavLoginOrLogout></NavLoginOrLogout>
      </div>
    </div>
  );
};

export default AdminNavbar;
