import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useOrdersFetch = ({ route, searchText = "", dataLoad = 10 }) => {
  const axiosSecure = useAxiosSecure();

  const {
    data,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/${route}?search=${searchText}&dataLoad=${dataLoad}`
      );
      return res.data;
    },
  });

  const orders = data?.ordersData || [] ;
  const totalResult = data?.totalResult || 0 ;

  return { orders, totalResult, isPending, refetch };
};

export default useOrdersFetch;
