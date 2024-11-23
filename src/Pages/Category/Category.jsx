import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { animatedProps, fristLetterCapitalize } from "../../utils/modules";
import useCategoryReletedProductsFatch from "../../hooks/useCategoryReletedProductsFatch";
import WaitingLoader from "../../Component/WaitingLoader/WaitingLoader";
import usePageViewMode from "../../hooks/usePageViewMode";
import PageViewMode from "../../Component/PageViewMode/PageViewMode";
import PageGridView from "../../Component/PageViewMode/PageGridView";
import PageListView from "../../Component/PageViewMode/PageListView";
import Pagination from "../../Component/Pagination/Pagination";
import RangeAndFilter from "../../Component/RangeAndFilter/RangeAndFilter";
import { useState } from "react";
import { animated } from "@react-spring/web";
import EmptyPage from "../../Component/EmptyPage/EmptyPage";

const Category = () => {
  const { category } = useParams();
  const capitalizedCategory = fristLetterCapitalize(category);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [priceRange, setPriceRange] = useState({});
  const [sort, setSort] = useState("");

  // console.log(sort)

  const {
    collections = [],
    isLoading,
    numberOfPage = 0,
    totalResults = 0,
  } = useCategoryReletedProductsFatch({
    category,
    itemPerPage,
    currentPage,
    priceRange,
    sort,
  });
  const { viewMode, setViewMode } = usePageViewMode();

  // console.log(collections);

  return (
    <div className="md:mt-6  md:max-w-6xl md:mx-auto mx-1">
      <Helmet>
        <title>Shop Esmart | {capitalizedCategory}</title>
      </Helmet>
      {isLoading && <WaitingLoader></WaitingLoader>}
      <div className="flex justify-between items-center ">
        <div>
          <h2 className="md:text-3xl text-xl font-bold capitalize  gap-2">
            {category} Category Result{" "}
            <animated.span>
              {animatedProps(totalResults).number.to((n) => n.toFixed(0))}
            </animated.span>
          </h2>
        </div>
        <div>
          <PageViewMode
            viewMode={viewMode}
            setViewMode={setViewMode}
          ></PageViewMode>
        </div>
      </div>
      {totalResults > 0 ? (
        <div>
          <div className="my-4">
            <RangeAndFilter
              setPriceRange={setPriceRange}
              setSort={setSort}
            ></RangeAndFilter>
          </div>

          <div>
            {/* show all category releted item  */}
            {viewMode === "grid" ? (
              <PageGridView collections={collections} />
            ) : (
              <PageListView collections={collections} />
            )}
          </div>

          {totalResults > 10 && (
            <div className="my-4">
              <Pagination
                numberOfPage={numberOfPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemPerPage={itemPerPage}
                setItemPerPage={setItemPerPage}
              ></Pagination>
            </div>
          )}
        </div>
      ) : (
        <EmptyPage></EmptyPage>
      )}
    </div>
  );
};

export default Category;
