import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useSingleProductReadForAdmin = (id) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: productDetails = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["productDetails"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/admin/${id}`);
      return res.data;
    },
  });

  return { productDetails, loading, refetch };
};

export default useSingleProductReadForAdmin;
