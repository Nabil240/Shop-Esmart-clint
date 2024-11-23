import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useReadAllProductsForAdmin = (path) => {
  const axiosSecure = useAxiosSecure();

  const { data, isPending: isLoading, refetch } = useQuery({
    queryKey: ["productsforAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`${path}`);
      return res.data;
    },
  });
  const collections = data?.collections || []; 
  const numberOfPage = data?.numberOfPage; 
  const totalResults = data?.totalResults || 0; 
  

  return [collections , isLoading, numberOfPage, totalResults, refetch];
}; 

export default useReadAllProductsForAdmin;
