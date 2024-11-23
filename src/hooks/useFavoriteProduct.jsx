import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useFavoriteProduct = ({ dataLoad }) => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const fetchFavorite = async () => {
    if (loading || !user?.email) {
      return [];
    }

    return new Promise((resolve) => {
      setTimeout(async () => {
        const res = await axiosSecure.get(`/favorites?dataLoad=${dataLoad}`);
        resolve(res.data);
      }, 700);
    });
  };

  const { data, isPending, refetch } = useQuery({
    queryKey: ["favorite"],
    enabled: !!user?.email || !loading,
    queryFn: fetchFavorite,
  });

  const favorites = data?.favoriteResults || [];

  const totalResult = data?.totalResult || 0;

  return { favorites, totalResult, isPending, refetch };
};

export default useFavoriteProduct;
