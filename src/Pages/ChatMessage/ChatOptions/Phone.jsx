import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Phone = () => {
  return (
    <Link
      to="tel:+8801794821866"
      className="flex items-center gap-2 px-6 py-3 text-white transition-all duration-300 bg-red-500 rounded-lg shadow-md text-nowrap hover:bg-red-600 hover:scale-105"
    >
      <FaPhoneAlt size={24} />
      <span className="text-lg font-semibold">Call Us</span>
    </Link>
  );
};

export default Phone;
