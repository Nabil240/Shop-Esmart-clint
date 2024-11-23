import { BiSolidShoppingBags } from "react-icons/bi";
import { Link } from "react-router-dom";

const NavLogo = () => {
    return (
        <Link to={'/'}>
            <h2 className="md:text-2xl text-xl text-[#FF3811] hover:text-[#ca1e0b] font-bold flex items-center  md:ps-1">
                <span className="text-2xl md:text-4xl"><BiSolidShoppingBags />
                </span> Shop Esmart 
            </h2>
        </Link>
    );
};

export default NavLogo;
