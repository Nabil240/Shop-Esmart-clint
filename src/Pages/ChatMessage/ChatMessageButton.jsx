import { useState } from "react";
import Whatsapp from "./ChatOptions/Whatsapp";
import Messanger from "./ChatOptions/Messanger";
import Phone from "./ChatOptions/Phone";
import { IoMdChatbubbles } from "react-icons/io";
import WebChat from "./ChatOptions/WebChat";

const ChatMessageButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed md:block hidden z-50 bottom-5 left-5">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#ff3811] hover:text-green-400 bg-white hover:border-green-400 text-3xl border-2 border-[#ff3811] p-3 rounded-full transition-all duration-300 hover:scale-105"
        >
          <IoMdChatbubbles />
        </button>

        {isOpen && (
          <div data-aos="fade-up"  className="absolute left-5  -top-60 flex-col flex space-y-2">
            <Whatsapp />
            <Messanger />
            <Phone />
            <WebChat/>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessageButton;
