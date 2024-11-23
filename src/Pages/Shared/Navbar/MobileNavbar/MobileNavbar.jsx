import { FaHome, FaLocationArrow, FaShoppingCart } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { MdPerson4 } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import useCarts from "../../../../hooks/useCarts";

const MobileNavbar = () => {
  const location = useLocation();
  const {carts} = useCarts(); 

  const menus = [
    { name: "Home", icone: <FaHome />, path: "/" },

    {
      name: "Chat",
      icone: <IoIosChatbubbles />,
      path: "/chat",
    },
    {
      name: "Location",
      icone: <FaLocationArrow />,
      path: "/location",
    },
    {
      name: "Cart",
      icone: <FaShoppingCart />,
      path: "/carts",
    },
    {
      name: "Profile",
      icone: <MdPerson4 />,
      path: "/profile",
    },
  ];

  return (
    <section className="dark:bg-black bg-white  text-slate-500  max-h-12 container mx-auto rounded-t-[30%]">
      <ul className="flex justify-evenly   relative">
        {menus.map((menu, i) => (
          <li key={i} className="">
            <NavLink
              to={`${menu.path}`}
              className={"flex flex-col  items-center pt-3 "}
            >
              <span
                className={`text-xl cursor-pointer duration-500 relative ${
                  location.pathname === menu.path &&
                  "-mt-2 text-2xl text-[#FF3811] "
                }`}
              >
                {menu.icone} {menu.name === 'Cart' && <span className={`${carts.length || 'hidden'} text-xs text-white absolute -top-1 left-5 bg-blue-500 rounded-full px-1`}>{carts.length}</span> }
              </span>
              <span
                className={`${
                  location.pathname === menu.path
                    ? "translate-y-0 duration-500  text-[#FF3811] opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
              >
                {menu.name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MobileNavbar;
