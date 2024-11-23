import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCarts = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const fetchCarts = async () => {
    if (loading || !user?.email) {
      return [];
    }

    return new Promise((resolve) => {
      setTimeout(async () => {
        const res = await axiosSecure.get(`/carts`);
        resolve(res.data);
      }, 1000);
    });
  };

  const { data, isPending, refetch } = useQuery({
    queryKey: ["carts"],
    enabled: !!user?.email || !loading,
    queryFn: fetchCarts,
  });

  const carts = data?.carts || [];
  const totalQuantity = data?.totalQuantity || 0;
  const totalPrice = data?.totalPrice || 0;

  return { carts, totalQuantity, totalPrice, isPending, refetch };
};

export default useCarts;
