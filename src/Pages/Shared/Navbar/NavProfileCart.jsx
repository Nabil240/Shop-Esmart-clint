import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useCarts from "../../../hooks/useCarts";

const NavProfileCart = () => {
    const { carts } = useCarts();

  return (
    <div className="hidden md:flex gap-x-4 text-[#FF3811] text-3xl">
      <Link to={"/location"}>
        <FaLocationDot />{" "}
      </Link>
      <Link className="relative" to={"/carts"}>
        <span>
          <FaShoppingCart />{" "}
        </span>
        {carts?.length > 0 && (
          <span className="text-sm font-bold text-white bg-blue-500 px-1 rounded-full -top-3 left-7 absolute">
            {carts?.length}
          </span>
        )}{" "}
      </Link>
      <Link to={"/profile"}>
        <CgProfile />
      </Link>
    </div>
  );
};

export default NavProfileCart;
