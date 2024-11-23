import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useReadAllProducts = (path) => {
    const axiosPublic = useAxiosPublic(); 

    const {data , isPending : isLoading, refetch} = useQuery({
        queryKey : ['products'],
        queryFn : async () => {
            const res = await axiosPublic.get(`${path}`); 
            return res.data 
        }
    })
    const collections = data?.foryouResults || []; 
    const totalResults = data?.totalResults || 0; 
    return [collections,totalResults, isLoading, refetch];
};

export default useReadAllProducts;