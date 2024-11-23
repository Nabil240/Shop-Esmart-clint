import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCoupons = ({searchText}) => {
    const axiosSecure = useAxiosSecure(); 
    const {data : coupons = [] , isPending, refetch}  = useQuery({
        queryKey : ['coupons'],
        queryFn : async() => {
            const res = await axiosSecure.get(`/coupons/admin?search=${searchText}`); 
            return res.data
        }
    })
   
    return {coupons, isPending, refetch}
};

export default useCoupons;