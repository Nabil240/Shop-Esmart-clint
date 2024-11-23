import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://esmart-navy.vercel.app",
  // baseURL: "https://esmart-navy.vercel.app",
  withCredentials : true
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
