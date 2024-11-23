import { FaHome } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const HomeAndBackButton = () => {
  const navigate = useNavigate();

  return (
    <div className=" flex bg-gray-200 dark:bg-gray-700  py-2 mb-3 ">
      <button
        className="w-1/2 flex items-center justify-center  hover:text-[#ff3811]"
        onClick={() => navigate(-1)}
      >
        {" "}
        <span className="text-2xl text-[#ff3811]">
          <MdOutlineKeyboardArrowLeft />
        </span>
        Back
      </button>
      <Link className="w-1/2 hover:text-[#ff3811]" to={"/"}>
        <button className="flex items-center justify-center gap-1 w-full">
          {" "}
          <span className="text-xl text-[#ff3811]">
            <FaHome></FaHome>
          </span>
          Home
        </button>
      </Link>
    </div>
  );
};

export default HomeAndBackButton;
