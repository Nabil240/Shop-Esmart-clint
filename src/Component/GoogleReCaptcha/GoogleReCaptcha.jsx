import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { confirmAlert, failedAlert } from "../SweetAlart/SweelAlart";

const GoogleReCaptcha = ({ setIsVarified, setIsCaptchaOpen }) => {
  const siteKey = import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY_V2;
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const handleCaptchaChangeToken = async (captchaToken) => {
    if (!captchaToken) {
      failedAlert("Robot Checking Failed!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosPublic.post("/captcha/verify", { captchaToken: captchaToken });
      if (res.data.success) {
        setIsVarified(true);
      } else {
        failedAlert("Varification Failed!");
        setIsVarified(false);
      }
    } catch (err) {
      setIsVarified(false);
      failedAlert("Somthing went Worng!");
    } finally {
      setTimeout(() => {
        setIsCaptchaOpen(false);
        setIsLoading(false);
      }, 1000);
    }
  };
  return (
    <div className="fixed z-50 inset-0 flex justify-center items-center w-full p-2">
      <div className="flex flex-col items-center bg-white p-6 rounded-md shadow-md">
        <div className="w-full flex justify-center">
          <div className="w-full sm:w-80">
            <ReCAPTCHA
              sitekey={siteKey}
              onChange={handleCaptchaChangeToken}
              className="g-recaptcha"
            />
          </div>
        </div>
        {isLoading && (
          <span className="py-2 text-sm text-gray-600">Please Wait...</span>
        )}
      </div>
    </div>
  );
};

export default GoogleReCaptcha;
