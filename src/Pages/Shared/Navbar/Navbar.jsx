import NavDarkMode from "./NavDarkMode";
import NavLoginOrLogout from "./NavLoginOrLogout";
import NavLogo from "./NavLogo";
import NavProfileCart from "./NavProfileCart";
import NavSearchBox from "./NavSearchBox";

const Navbar = () => {
  return (
    <section className="dark:bg-black bg-slate-900 rounded-b-[25%] grid md:grid-cols-6 grid-cols-4 px-3 md:gap-2 md:items-center md:py-6 py-4">
      {/* div for brand logo  */}
      <div className="col-span-2 md:col-span-1 order-1">
        <NavLogo></NavLogo>
      </div>

      {/* div for search bar */}
      <div className="md:col-span-3 col-span-4 mt-2 md:mt-0 order-3 md:order-2">
        <NavSearchBox></NavSearchBox>
      </div>

      {/* div for logout button and dark mode */}
      <div className="col-span-2 md:col-span-2  order-2 md:order-3  items-center flex justify-end gap-x-4">
        <NavProfileCart></NavProfileCart>
        <NavDarkMode></NavDarkMode>
        <NavLoginOrLogout></NavLoginOrLogout>
      </div>
    </section>
  );
};

export default Navbar;
