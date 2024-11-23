import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import useFavoriteProduct from "../../hooks/useFavoriteProduct";
import { confirmationAlert } from "../SweetAlart/SweelAlart";
import { useLocation, useNavigate } from "react-router-dom";

const AddFavoriteProduct = ({ product_id }) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const { refetch } = useFavoriteProduct({});

  useEffect(() => {
    if (!user || loading) {
      return;
    }
    const checkFavorite = async () => {
      const res = await axiosSecure.get(
        `/favorites-check/?product_id=${product_id}`
      );

      const favorites = res.data.status;
      setIsFavorite(favorites);
    };

    const timeoutId = setTimeout(() => {
      checkFavorite();
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [axiosSecure, product_id, user, loading]);

  const toggleFavorite = async (event) => {
    event.stopPropagation();
    if (!user?.email) {
      confirmationAlert({
        titleText: "Log In Required",
        confirmButtonText: "Log In Now",
        detailsText:
          "You need to be logged in to add items to your cart. Please log in to continue.",
      }).then((result) => {
        if (result.isConfirmed) {
          return navigate("/login", { state: { from: location.pathname } });
        }
      });
      return;
    }
    const email = user?.email;
    if (isFavorite) {
      await axiosSecure.delete(`/favorites`, { data: { email, product_id } });
    } else {
      await axiosSecure.post("/favorites", { email, product_id });
    }
    refetch();
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      onClick={toggleFavorite}
      className="z-30 cursor-pointer  md:text-2xl text-lg  text-[#ff3811]"
    >
      {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
    </div>
  );
};

export default AddFavoriteProduct;
