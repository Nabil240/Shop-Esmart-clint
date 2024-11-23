import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useMyOrders = ({ order_status }) => {
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isPending: loading, refetch } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?order_status=${order_status}`);
      return res.data;
    },
  });

  return { orders, loading , refetch };
};

export default useMyOrders;
