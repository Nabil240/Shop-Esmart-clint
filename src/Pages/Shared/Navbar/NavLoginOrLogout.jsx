import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { confirmAlert } from "../../../Component/SweetAlart/SweelAlart";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const NavLoginOrLogout = () => {
  const { user, userLogout } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleLogout = async () => {
   
     
    
    const res = await axiosPublic.patch(`/users/logout?email=${user?.email}`);
    

    if (res.data.success) {
      userLogout()
        .then(() => {
          //logout success
          confirmAlert("Log out Success !!");
        })
        .catch((err) => {console.log(err)});
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <button
            onClick={handleLogout}
            className="md:bg-[#FF3811] text-lg md:text-base text-[#FF3811] hover:text-[#ca1e0b] md:hover:text-white md:text-white md:hover:bg-[#ca1e0b] md:px-4  md:font-semibold md:py-2 rounded-md "
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-x-1">
          <Link to={"/login"}>
            <button className="md:bg-[#FF3811] text-lg md:text-base text-[#FF3811] hover:text-[#ca1e0b] md:hover:text-white md:text-white md:hover:bg-[#ca1e0b] md:px-6  md:font-semibold md:py-2 rounded-md ">
              Log in
            </button>
          </Link>
          <div className=" text-xs md:text-2xl text-[#FF3811]">|</div>
          <Link to={"/signup"}>
            <button className="md:bg-[#FF3811] text-lg md:text-base text-[#FF3811] hover:text-[#ca1e0b] md:hover:text-white md:text-white md:hover:bg-[#ca1e0b] md:px-6  md:font-semibold md:py-2 rounded-md ">
              Sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavLoginOrLogout;
