import { PiWechatLogoFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const WebChat = () => {
  return (
    <div>
      <Link
        to="/webChat"
        rel="noopener noreferrer"
        className="flex text-nowrap items-center gap-2 bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 hover:scale-105 transition-all duration-300 shadow-md"
      >
        <PiWechatLogoFill size={24} />
        <span className="text-lg font-semibold">Chat on the Web</span>
      </Link>
    </div>
  );
};

export default WebChat;
