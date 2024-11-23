import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from './useAuth';


const useUserInfo = () => {
    const axiosSecure = useAxiosSecure(); 
    const {user} = useAuth(); 
    
    const {data : usersInfo = [], isPending, refetch} = useQuery({
        queryKey : ['usersInfo'],
        queryFn : async () => {
            const res = await axiosSecure.get(`/usersInfo`)
            return res.data; 
        },
        enabled : !!user?.email
    })
   
    return [usersInfo, isPending, refetch ]
};

export default useUserInfo;