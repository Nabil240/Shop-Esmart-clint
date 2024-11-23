import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useHotPicks from "../../hooks/useHotPicks";
import usePageViewMode from "../../hooks/usePageViewMode";
import WaitingLoader from "../WaitingLoader/WaitingLoader";
import PageViewMode from "../PageViewMode/PageViewMode";
import { FaFire } from "react-icons/fa";
import PageGridView from "../PageViewMode/PageGridView";
import PageListView from "../PageViewMode/PageListView";
import HomeAndBackButton from "../HomeAndBackButton/HomeAndBackButton";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";

const SeeAllProducts = () => {
  const { path: route } = useParams();
  const [searchParams] = useSearchParams();

  let path = route;

  if (searchParams.size > 0) {
    const _id = searchParams.get("_id") || "";
    const category = searchParams.get("category") || "";
    const tags = searchParams.get("tags")
      ? searchParams.get("tags").split(",")
      : [];

    path = `${route}?_id=${_id}&category=${category}&tags=${tags}&`;
  }

  const [dataLoad, setDataLoad] = useState(15);
  const { collections, loading, totalResult } = useHotPicks({ path, dataLoad });
  const { viewMode, setViewMode } = usePageViewMode();

  const dynamicHeadline = (() => {
    switch (route) {
      case "products-hotPicks":
        return "Hot Picks";
      case "products-releted":
        return "Releted Products";
      default:
        return "All Products";
    }
  })();

  return (
    <div className=" md:max-w-6xl md:mx-auto mx-2 space-y-3">
      {loading && <WaitingLoader></WaitingLoader>}
      <div className="mt-3">
        <HomeAndBackButton></HomeAndBackButton>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="md:text-3xl text-xl font-bold flex items-center gap-2">
          {dynamicHeadline}{" "}
          {dynamicHeadline === "Hot Picks" && (
            <span className="text-[#FF3811] text-2xl">
              <FaFire />{" "}
            </span>
          )}
        </h2>
        <PageViewMode
          viewMode={viewMode}
          setViewMode={setViewMode}
        ></PageViewMode>
      </div>

      <div>
        {/* show all category releted item  */}
        {viewMode === "grid" ? (
          <PageGridView collections={collections} />
        ) : (
          <PageListView collections={collections} />
        )}
      </div>

      {totalResult > 10 && totalResult !== collections?.length && (
        <LoadMoreButton setDataLoad={setDataLoad}></LoadMoreButton>
      )}
    </div>
  );
};

export default SeeAllProducts;
