import PageViewMode from "./../../../Component/PageViewMode/PageViewMode";
import PageGridView from "./../../../Component/PageViewMode/PageGridView";
import PageListView from "../../../Component/PageViewMode/PageListView";
import useReadAllProducts from "../../../hooks/useReadAllProducts";
import usePageViewMode from "../../../hooks/usePageViewMode";
import { useEffect, useState } from "react";
import LoadMoreButton from "../../../Component/LoadMoreButton/LoadMoreButton";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";
const ForYouProduct = () => {
  const [dataLoad, setDataLoad] = useState(10);

  const [collections, totalResults, isLoading, refetch] = useReadAllProducts(
    `/products-foryou?dataLoad=${dataLoad}`
  );

  const { viewMode, setViewMode } = usePageViewMode();

  useEffect(() => {
    if (!isLoading) {
      refetch();
    }
  }, [dataLoad, isLoading, refetch]);

  return (
    <section className="mb-6">
      {isLoading && <WaitingLoader></WaitingLoader>}
      <div className="flex justify-between mb-3 md:mb-5">
        <h2 className="md:text-3xl text-xl font-bold  gap-2">For you</h2>
        <PageViewMode
          viewMode={viewMode}
          setViewMode={setViewMode}
        ></PageViewMode>
      </div>

      {viewMode === "grid" ? (
        <PageGridView collections={collections} />
      ) : (
        <PageListView collections={collections} />
      )}

      {totalResults > 10 && collections.length !== totalResults && (
        <div className="my-6">
          <LoadMoreButton setDataLoad={setDataLoad}></LoadMoreButton>
        </div>
      )}
    </section>
  );
};

export default ForYouProduct;
