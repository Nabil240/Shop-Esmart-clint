import { RiMenuLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import useUserRoleCheck from "../../../../hooks/useUserRoleCheck";

const AdminNavMenu = () => {
  const {userType} = useUserRoleCheck(); 

  const handleCloseDrawer = () => {
    document.getElementById("my-drawer").checked = false;
  };

  const commonNavMenus = (
    <>
      <li>
        <NavLink
          className="flex items-center transform transition duration-200 hover:scale-110 w-full"
          to={"/dashboard"}
          end
        >
          <span className="text-xl">
            <RiMenuLine />{" "}
          </span>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          className="flex items-center transform transition duration-200 hover:scale-110 w-full"
          to={"/dashboard/allProducts"}
        >
          <span className="text-xl">
            <RiMenuLine />{" "}
          </span>
          All Products
        </NavLink>
      </li>
      <li>
        <NavLink
          className="flex items-center transform transition duration-200 hover:scale-110 w-full"
          to={"/dashboard/addNewProduct"}
        >
          <span className="text-xl">
            <RiMenuLine />{" "}
          </span>
          Add New Product
        </NavLink>
      </li>
      <li>
        <NavLink
          className="flex items-center transform transition duration-200 hover:scale-110 w-full"
          to={"/dashboard/categories"}
        >
          <span className="text-xl">
            <RiMenuLine />{" "}
          </span>
          Categories
        </NavLink>
      </li>
      <li>
        <NavLink
          className="flex items-center transform transition duration-200 hover:scale-110 w-full"
          to={"/dashboard/pendingOrders"}
        >
          <span className="text-xl">
            <RiMenuLine />{" "}
          </span>
          Pending Orders
        </NavLink>
      </li>
      <li>
        <NavLink
          className="flex items-center transform transition duration-200 hover:scale-110 w-full"
          to={"/dashboard/allOrders"}
        >
          <span className="text-xl">
            <RiMenuLine />{" "}
          </span>
          All Confirm Orders
        </NavLink>
      </li>
     
      <li>
        <NavLink
          className="flex items-center transform transition duration-200 hover:scale-110 w-full"
          to={"/dashboard/processingOrders"}
        >
          <span className="text-xl">
            <RiMenuLine />{" "}
          </span>
          Processing Orders
        </NavLink>
      </li>

      <li>
        <NavLink
          className="flex items-center transform transition duration-200 hover:scale-110 w-full"
          to={"/dashboard/allUsers"}
        >
          <span className="text-xl">
            <RiMenuLine />{" "}
          </span>
          All Users
        </NavLink>
      </li>
      <li>
        <NavLink
          className="flex items-center transform transition duration-200 hover:scale-110 w-full"
          to={"/dashboard/coupons"}
        >
          <span className="text-xl">
            <RiMenuLine />{" "}
          </span>
          Coupons
        </NavLink>
      </li>
      <li>
        <NavLink
          className="flex items-center transform transition duration-200 hover:scale-110 w-full"
          to={"/dashboard/message"}
        >
          <span className="text-xl">
            <RiMenuLine />{" "}
          </span>
          Messages
        </NavLink>
      </li>
      <li>
        <NavLink
          className="flex items-center transform transition duration-200 hover:scale-110 w-full"
          to={"/dashboard/transactions"}
        >
          <span className="text-xl">
            <RiMenuLine />{" "}
          </span>
          Transactions
        </NavLink>
      </li>
    </>
  );

  const adminNavMenus = (
    <>
      <li>
        <NavLink
          className="flex items-center transform transition duration-200 hover:scale-110 w-full"
          to={"/dashboard/adminUsers"}
        >
          <span className="text-xl">
            <RiMenuLine />{" "}
          </span>
          Admin Users
        </NavLink>
      </li>
      <li>
        <NavLink
          className="flex items-center transform transition duration-200 hover:scale-110 w-full"
          to={"/dashboard/completeOrders"}
        >
          <span className="text-xl">
            <RiMenuLine />{" "}
          </span>
          Complete Orders
        </NavLink>
      </li>
      <li>
        <NavLink
          className="flex items-center transform transition duration-200 hover:scale-110 w-full"
          to={"/dashboard/canceledOrders"}
        >
          <span className="text-xl">
            <RiMenuLine />{" "}
          </span>
          Canceled Orders
        </NavLink>
      </li>
      
      <li>
        <NavLink
          className="flex items-center transform transition duration-200 hover:scale-110 w-full"
          to={"/dashboard/siteSettings"}
        >
          <span className="text-xl">
            <RiMenuLine />{" "}
          </span>
          Site Settings
        </NavLink>
      </li>
    </>
  );

  const clientNavMenus = (
    <>
      <li>
        <Link to={"/"}>Home Page</Link>
        <Link to={"/profile"}>My Profile</Link>
      </li>
    </>
  );

  return (
    <div className="drawer-side z-50">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul
        onClick={handleCloseDrawer}
        className="menu bg-base-200 gap-1 md:text-base text-sm min-h-full w-48 md:w-60 p-2 pb-10"
      >
        {commonNavMenus}
        {(userType === "admin" || userType == "manager") && adminNavMenus}
        <div className="divider"></div>
        {clientNavMenus}
      </ul>
    </div>
  );
};

export default AdminNavMenu;
