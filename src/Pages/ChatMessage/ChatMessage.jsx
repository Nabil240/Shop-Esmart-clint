import Whatsapp from "./ChatOptions/Whatsapp";
import Messanger from "./ChatOptions/Messanger";
import Phone from "./ChatOptions/Phone";
import WebChat from "./ChatOptions/WebChat";

const ChatMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 p-4">
      <h1 className="md:text-3xl text-lg font-bold mb-4 text-center">
        Contact Us
      </h1>

      <div data-aos="fade-up" className="flex flex-col md:flex-row md:gap-6 gap-3">
        <Whatsapp />
        <Messanger />
        <Phone />
        <WebChat />
      </div>
    </div>
  );
};

export default ChatMessage;
