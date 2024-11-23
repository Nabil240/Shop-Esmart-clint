import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiLockClosed } from "react-icons/hi";
import { HiMiniLockOpen } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import GoogleLogin from "../../Component/SocialLogin/GoogleLogin/GoogleLogin";
import FacebookLogin from "../../Component/SocialLogin/FacebookLogin/FacebookLogin";
import useAuth from "./../../hooks/useAuth";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import {
  confirmAlert,
  failedAlert,
} from "../../Component/SweetAlart/SweelAlart";
import GoogleReCaptcha from "../../Component/GoogleReCaptcha/GoogleReCaptcha";
import WaitingLoader from "./../../Component/WaitingLoader/WaitingLoader";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { createNewUser, user, userUpdateProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("Oh No! Sign Up Failed");
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
  const [isVarified, setIsVarified] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  useEffect(() => {
    if (user) return navigate("/");
  }, [user, navigate]);

  const passwordValidation = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /^(?=.*[A-Z])/.test(password),
      lowercase: /^(?=.*[a-z])/.test(password),
      number: /^(?=.*\d)/.test(password),
      specialChar: /^(?=.*[@$!%*?&#])/.test(password),
    };
  };
  const validationStatus = passwordValidation(password);
  const isValid = Object.values(validationStatus).every(Boolean);

  const onSubmit = async (data) => {
    if (!isVarified) {
      setIsCaptchaOpen(true);
      return;
    }
    try {
      setLoading(true);
      const result = await createNewUser(data.email, data.password);
      const firebaseInfo = result?.user;

      await userUpdateProfile(data.name);

      const newUser = {
        name: data.name,
        email: data.email,
        type: "user",
        isBaned: false,
        creationTime: firebaseInfo?.metadata?.creationTime,
        lastSignInTime: firebaseInfo?.metadata?.lastSignInTime,
        activity: true,
      };
      const res = await axiosPublic.post("/users", newUser);

      const insertedId = res.data.insertedId;

      if (insertedId) {
        confirmAlert("Good Job! SignUp Success");
        return navigate(location?.state ? location.state : "/");
      }
    } catch (err) {
      const errCode = err.code;
      switch (errCode) {
        case "auth/email-already-in-use":
          setErrorMessage("Email already in used");
          break;
      }
      failedAlert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="1500"
      className="md:bg-signup-bg bg-cover bg-center  dark:text-white text-black md:text-white"
    >
      <Navbar></Navbar>
      {loading && <WaitingLoader></WaitingLoader>}
      <div className="md:min-h-screen md:mb-0 mb-10">
        <h2 className="text-center md:text-4xl text-xl font-semibold my-4 text-white">
          Sing UP
        </h2>
        <div className="md:w-1/2 md:p-12 p-4  w-11/12 mx-auto bg-transparent backdrop-blur-md shadow-xl md:shadow-none border rounded-md">
          <form
            noValidate
            className="md:space-y-6 space-y-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative">
              <label htmlFor="name">Name</label>
              <input
                className="w-full outline-none border-b py-2 px-1 bg-transparent "
                placeholder="your name"
                type="text"
                name="name"
                {...register("name", {
                  required: "Name cannot be empty",
                  minLength: {
                    value: 3,
                    message: "Name At least 3 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/i,
                    message: "Use letters & spaces only",
                  },
                })}
              />
              {errors.name && (
                <span
                  className="tooltip tooltip-open tooltip-right tooltip-error absolute md:left-14 left-12 top-3"
                  data-tip={errors.name.message}
                ></span>
              )}
            </div>
            <div className="relative">
              <label htmlFor="email ">Email</label>
              <input
                className="w-full outline-none border-b py-2 px-1 bg-transparent "
                placeholder="email"
                type="email"
                name="email"
                {...register("email", {
                  required: "Email cannot be empty",
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
            <div className="relative">
              <label htmlFor="email">Password</label>
              <input
                className="w-full outline-none border-b py-2 px-1 bg-transparent "
                placeholder="password"
                type={`${showPassword ? "password" : "text"}`}
                name="password"
                {...register("password", {
                  required: "Password cannot be empty",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                    message: "Password is not perfect",
                  },

                  onChange: (e) => {
                    setPassword(e.target.value), trigger("password");
                  },
                })}
              />
              <span
                className="absolute right-2 top-1/2 text-2xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiLockClosed /> : <HiMiniLockOpen />}
              </span>

              {errors.password && (
                <span
                  className="tooltip tooltip-open tooltip-right tooltip-error absolute left-20 top-3"
                  data-tip={errors.password.message}
                ></span>
              )}

              {password && !isValid && errors.password && (
                <div className="absolute bg-white w-full md:w-1/2 md:left-1/4 mt-2 rounded-sm p-4 mx-auto text-black">
                  <h3 className="text-sm">
                    Password must meet the following requirements :
                  </h3>
                  <ul>
                    <li
                      className={
                        validationStatus.lowercase
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {" "}
                      {validationStatus.lowercase ? "✔" : "✖"} At least one
                      letter
                    </li>
                    <li
                      className={
                        validationStatus.uppercase
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {" "}
                      {validationStatus.uppercase ? "✔" : "✖"} At least one
                      capital letter
                    </li>
                    <li
                      className={
                        validationStatus.number
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {" "}
                      {validationStatus.number ? "✔" : "✖"} At least one number
                    </li>
                    <li
                      className={
                        validationStatus.specialChar
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {" "}
                      {validationStatus.specialChar ? "✔" : "✖"} At least one
                      special character
                    </li>
                    <li
                      className={
                        validationStatus.length
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {" "}
                      {validationStatus.length ? "✔" : "✖"} Be at least 8
                      characters
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="">
              <input
                disabled={loading}
                type="submit"
                value="Sign Up"
                className="btn-block cursor-pointer text-white py-2 rounded-sm hover:bg-[#d31f0b] bg-[#FF3811]"
              />
            </div>
            {/* goolge reCaptcha  */}
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
              Already have an Account ?{" "}
              <Link to={"/login"}>
                <span className="text-[#ff3811] underline font-semibold">
                  Log in
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
