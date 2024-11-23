import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://esmart-navy.vercel.app",
  // baseURL: "https://esmart-navy.vercel.app",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { userLogout, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.request.use(
      (config) => {
        const userEmail = user?.email;
        if (userEmail) {
          if (!config.params) {
            config.params = {};
          }

          if (!config.params.email) {
            config.params.email = userEmail;
          }
        }

        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err) => {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          await userLogout();
          navigate("/login");
        } else if (status === 405 || status === 423) {
          navigate("/");
        }

        return Promise.reject(err);
      }
    );
  }, [navigate, userLogout]);
  return axiosSecure;
};

export default useAxiosSecure;
