import { useEffect, useState } from "react";
import EmptyPage from "../../Component/EmptyPage/EmptyPage";
import HomeAndBackButton from "../../Component/HomeAndBackButton/HomeAndBackButton";
import useFavoriteProduct from "../../hooks/useFavoriteProduct";
import LoadMoreButton from "../../Component/LoadMoreButton/LoadMoreButton";
import WaitingLoader from "../../Component/WaitingLoader/WaitingLoader";
import PageGridView from "../../Component/PageViewMode/PageGridView";
import { confirmAlert, confirmationAlert } from "../../Component/SweetAlart/SweelAlart";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { animatedProps } from "../../utils/modules";
import { animated } from "@react-spring/web";

const MyFavorite = () => {
  const [dataLoad, setDataLoad] = useState(10);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { favorites, totalResult, refetch, isPending } = useFavoriteProduct({
    dataLoad,
  });

  
  useEffect(() => {
    refetch();
  }, [dataLoad, refetch]);

  const handleClearAll = async () => {
    confirmationAlert({}).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(
          `/favorites-clear-all/${user.email}`
        );
        if (res.data.deletedCount > 0) {
          confirmAlert("Deleted Success!")
          refetch();
        }
      }
    });
  };
  return (
    <div className="mt-3 md:max-w-6xl md:mx-auto mx-2">
      <HomeAndBackButton></HomeAndBackButton>
      {isPending && <WaitingLoader></WaitingLoader>}
      <div className="flex items-center justify-between my-3">
        <h2 className="text-center md:text-4xl text-2xl">
          My Favorite <animated.span>
              {animatedProps(totalResult).number.to((n) => n.toFixed(0))}
            </animated.span> Items
        </h2>
        <button
          onClick={handleClearAll}
          className="bg-[#ff3811] hover:bg-red-700 text-white px-3 py-1 rounded-md"
        >
          Clear All
        </button>
      </div>
      {totalResult > 0 ? (
        <PageGridView collections={favorites} />
      ) : (
        <EmptyPage></EmptyPage>
      )}

      {totalResult > 10 && favorites.length !== totalResult && (
        <LoadMoreButton
          isPending={isPending}
          setDataLoad={setDataLoad}
        ></LoadMoreButton>
      )}
    </div>
  );
};

export default MyFavorite;
