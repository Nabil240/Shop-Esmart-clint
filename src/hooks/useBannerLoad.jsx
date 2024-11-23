import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useBannerLoad = () => {
    const axiosPublic = useAxiosPublic();  
    
    const {data : bannersData = [], isPending, refetch} = useQuery({
        queryKey : ['banners'],
        queryFn : async() => {
            const res = await axiosPublic.get('/banners'); 
            return res.data; 
        }
    }); 

    return [bannersData, isPending, refetch]
};


export default useBannerLoad;