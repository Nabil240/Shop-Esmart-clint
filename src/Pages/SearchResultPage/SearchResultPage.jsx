import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import WaitingLoader from "../../Component/WaitingLoader/WaitingLoader";
import LoadMoreButton from "../../Component/LoadMoreButton/LoadMoreButton";
import { animated } from "@react-spring/web";
import { animatedProps } from "../../utils/modules";
import HomeAndBackButton from "../../Component/HomeAndBackButton/HomeAndBackButton";
import PageGridView from "../../Component/PageViewMode/PageGridView";
import EmptyPage from "../../Component/EmptyPage/EmptyPage";

const SearchResultPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const axiosPublic = useAxiosPublic();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoad, setDataLoad] = useState(10);

  useEffect(() => {
    try {
      axiosPublic
        .get(`/products-search?search=${query}&dataLoad=${dataLoad}`)
        .then((result) => {
          setSearchResult(result.data);
        });
    } finally {
      setLoading(false);
    }
  }, [query, axiosPublic, dataLoad]);

  return (
    <div className="min-h-96 md:max-w-6xl md:mx-auto mx-2 my-2 space-y-3">
      <HomeAndBackButton></HomeAndBackButton>
      {loading && <WaitingLoader></WaitingLoader>}
      <div>
        <h2 className="md:text-3xl text-xl font-bold capitalize  gap-2">
          Your Search Results{" "}
          <animated.span>
            {animatedProps(searchResult?.totalResults).number.to((n) =>
              n.toFixed(0)
            )}
          </animated.span>
        </h2>
      </div>
      {searchResult?.searchResultss?.length > 0 ? (
        <div>
          <PageGridView collections={searchResult?.searchResultss} />
        </div>
      ) : (
        <EmptyPage></EmptyPage>
      )}

      {searchResult?.totalResults > 10 &&
        searchResult?.searchResults?.length !== searchResult?.totalResults && (
          <div>
            <LoadMoreButton setDataLoad={setDataLoad}></LoadMoreButton>
          </div>
        )}
    </div>
  );
};

export default SearchResultPage;
