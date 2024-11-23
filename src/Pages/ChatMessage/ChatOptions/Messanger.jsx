import { FaFacebookMessenger } from "react-icons/fa";
import { Link } from "react-router-dom";

const Messanger = () => {
  return (
    <Link
      to="https://www.facebook.com/Nabil290/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-6 py-3 text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-md text-nowrap hover:bg-blue-700 hover:scale-105"
    >
      <FaFacebookMessenger size={24} />
      <span className="text-lg font-semibold">Chat on Messenger</span>
    </Link>
  );
};

export default Messanger;
