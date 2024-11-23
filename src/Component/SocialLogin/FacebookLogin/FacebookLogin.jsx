import { FaFacebook } from "react-icons/fa6";

const FacebookLogin = () => {
  return (
    <div className="">
      <button className="btn-block flex items-center justify-center gap-2  py-2 rounded-sm hover:bg-[#ff3811] border border-[#FF3811]">
        <FaFacebook className="text-xl text-blue-600" />
        Continue With Facebook
      </button>
    </div>
  );
};

export default FacebookLogin;
