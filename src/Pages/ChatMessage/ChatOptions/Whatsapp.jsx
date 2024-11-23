import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Whatsapp = () => {
  return (
    <Link
      to="https://wa.me/8801794821866"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-6 py-3 text-white transition-all duration-300 bg-green-500 rounded-lg shadow-md text-nowrap hover:bg-green-600 hover:scale-105"
    >
      <FaWhatsapp size={24} />
      <span className="text-lg font-semibold">Chat on WhatsApp</span>
    </Link>
  );
};

export default Whatsapp;
