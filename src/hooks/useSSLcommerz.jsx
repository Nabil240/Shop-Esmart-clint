import { failedAlert } from "../Component/SweetAlart/SweelAlart";
import useAxiosSecure from "./useAxiosSecure";

const useSSLcommerz = ({ setLoading }) => {
  const axiosSecure = useAxiosSecure();

  const sslCommerzPayment = async (newOrder) => {
    try {
      setLoading(true);
      const res = await axiosSecure.post(`/initiate-payment`, newOrder);
      const paymentUrl = res.data.url;
      if (paymentUrl) {
        window.location.replace(paymentUrl);
      }
    } catch (err) {
      failedAlert("Payment Failed!");
    } finally {
      setLoading(false);
    }
  };

  return { sslCommerzPayment };
};

export default useSSLcommerz;
