import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiLockClosed } from "react-icons/hi";
import { HiMiniLockOpen } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import GoogleLogin from "../../Component/SocialLogin/GoogleLogin/GoogleLogin";
import FacebookLogin from "../../Component/SocialLogin/FacebookLogin/FacebookLogin";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import {
  confirmAlert,
  failedAlert,
} from "../../Component/SweetAlart/SweelAlart";
import GoogleReCaptcha from "../../Component/GoogleReCaptcha/GoogleReCaptcha";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, userLogin, forgotPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("Login Failed! Try Again");
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
  const [isVarified, setIsVarified] = useState(false);

  useEffect(() => {
    if (user) return navigate("/");
  }, [user, navigate]);

  const onSubmit = async (data) => {
    if (!isVarified) {
      setIsCaptchaOpen(true);
      return;
    }

    try {
      const result = await userLogin(data.email, data.password);
      const firebaseInfo = result?.user;

      const res = await axiosPublic.patch('/users/login',{ email : data.email,
        lastSignInTime: firebaseInfo?.metadata?.lastSignInTime,
      });

      const matchedCount = res?.data?.result?.matchedCount;
      if (matchedCount) {
        confirmAlert("Login Success!");
        setShowForgotPass(false)
        return navigate(location?.state ? location.state : "/");
      }
    } catch (err) {
      setIsVarified(false);
     setShowForgotPass(true)
      failedAlert(errorMessage);
    }
  };

  const hadleForgotPassword = async () => {
    
    const  { value: email } = await Swal.fire({
      title: "Forgot your Password ?",
      input: "email",
      inputLabel: "Please Enter your email address and we'll send you instructions on how to reset your password",
      inputPlaceholder: "Enter your email address",
      confirmButtonText: 'Reset Request',
      confirmButtonColor: 'green',
      customClass: {
        title: "text-lg md:text-2xl",
        inputLabel: 'text-xs md:w-3/5 text-center',
        text: "text-sm md:text-xl",
      },
    });
    if (email) {
      forgotPassword(email)
      .then(()=>{
        confirmAlert('Password Reset Success! Check your Email')
        setShowForgotPass(false)
      })
      .catch(err => {
        console.log(err);
        if(err){
          failedAlert('Password Reset Failed')
        }
      })

      
    }
  }
  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="1500"
      className="md:bg-login-bg bg-cover  bg-center min-h-screen  dark:text-white  text-black md:text-white"
    >
      <Navbar></Navbar>
      

      <div className="">
        <h2 className="text-center md:text-4xl text-xl font-semibold my-4 ">
          Log in
        </h2>

        <div className="md:w-1/2 md:p-12 p-4  w-11/12 mx-auto shadow-xl md:shadow-none md:bg-transparent md:backdrop-blur-md border rounded-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <div className="relative">
              <label htmlFor="email">Email</label>
              <input
                className="w-full outline-none border-b py-2 px-1 bg-transparent "
                placeholder="your email"
                type="email"
               
                {...register("email", {
                  required: "Email must be required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    message: "Please enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <span
                  className="tooltip tooltip-open tooltip-right tooltip-error absolute md:left-14 left-12 top-3"
                  data-tip={errors.email.message}
                ></span>
              )}
            </div>
            <div className="relative ">
              <label htmlFor="email">Password</label>
              <input
                className="w-full outline-none border-b py-2 px-1 bg-transparent "
                placeholder="your password"
                type={`${showPassword ? "password" : "text"}`}
                {...register("password", {
                  required: "Password must be required",
                })}
              />
              {errors.password && (
                <span
                  className="tooltip tooltip-open tooltip-right tooltip-error absolute left-20 top-3"
                  data-tip={errors.password.message}
                ></span>
              )}
              <span
                className="absolute right-2 top-1/2 text-2xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiLockClosed /> : <HiMiniLockOpen />}
              </span>
            {showForgotPass && <span className="absolute top-0 cursor-pointer right-0 underline text-[#ff3811] " onClick={hadleForgotPassword}>Forgot Password</span>}
            </div>
            <div className="mt-2">
              <input
                type="submit"
                value="Login"
                className="btn-block cursor-pointer text-white py-2 rounded-sm hover:bg-[#d31f0b] bg-[#FF3811]"
              />
            </div>

            {/* google rechaptcha */}
            {isCaptchaOpen && (
              <GoogleReCaptcha
                setIsVarified={setIsVarified}
                setIsCaptchaOpen={setIsCaptchaOpen}
              />
            )}
          </form>
          <div className="divider">or</div>
          <div className="grid md:grid-cols-2 gap-4">
            <GoogleLogin></GoogleLogin>
            <FacebookLogin></FacebookLogin>
          </div>
          <div className="text-center mt-3">
            <p>
              New to here ?{" "}
              <Link to={"/signup"}>
                <span className="text-[#ff3811] underline font-semibold">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <aside className="text-center md:hidden absolute bottom-0 w-full bg-slate-800 text-xs md:text-sm text-white py-4">
          <p>
            Copyright © ${new Date().getFullYear()} - Develop By Mozzammel Ridoy
          </p>
        </aside>
    </div>
  );
};

export default Login;
