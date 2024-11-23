import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useUsers = ({path, dataLoad = 10, searchText=''}) => {
    const axiosSecure = useAxiosSecure(); 
  
    
    const {data, isPending : isLoading, refetch} = useQuery({
        queryKey : ['users', path],
        queryFn : async ()=> {
            const res = await axiosSecure.get(`${path}?dataLoad=${dataLoad}&search=${searchText}`)
            return res.data; 
        }
    })
    const users = data?.users || []; 
    const totalResults = data?.totalResults || 0; 

    return [users, isLoading, totalResults, refetch]
};

export default useUsers;