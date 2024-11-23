import { useEffect, useState } from "react";
import EmptyPage from "../../../Component/EmptyPage/EmptyPage";
import AdminPageGridView from "../../../Component/PageViewMode/AdminPageGridView";
import Pagination from "../../../Component/Pagination/Pagination";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";
import useReadAllProductsForAdmin from "../../../hooks/useReadAllProductsForAdmin";
import { animatedProps } from "../../../utils/modules";
import { animated } from "@react-spring/web";

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const page = Number(currentPage) || 0;
  const size = Number(itemPerPage) || 10;
 
  const [collections, isLoading, numberOfPage,totalResults, refetch] =
    useReadAllProductsForAdmin(
      `/products/admin?page=${page}&size=${size}&search=${searchText}`
    );
  const hanldeSearchText = async (e) => {
    e.preventDefault(); 
    setSearchText(e.target.searchText.value);
    refetch();
  };

  useEffect(()=>{
        refetch()
        if(searchText){
            setCurrentPage(0)
            
        }
  },[refetch, currentPage, itemPerPage, searchText ])
  
  return (
    <div className="md:max-w-6xl md:mx-auto mx-2">
      <h2 className="text-2xl md:text-4xl text-center my-4">
        All Products Results <animated.span>
              {animatedProps(totalResults).number.to((n) => n.toFixed(0))}
            </animated.span>
      </h2>
      <form onSubmit={hanldeSearchText} className="md:max-w-96 max-w-80 mx-auto flex mb-6">
        <input
          name="searchText"
          type="text"
          className="py-1 px-2 outline-none border border-[#ff3811] border-e-0 w-full"
          placeholder="search id.. code.. or title.. "
        />
        <button
          
          className="bg-[#ff3811]  hover:bg-red-500 px-3 text-white"
        >
          Search
        </button>
      </form>
      {isLoading && <WaitingLoader></WaitingLoader>}
      {collections.length > 0 ? (
        <div>
          <div>
            <AdminPageGridView
              collections={collections}
              refetch={refetch}
            ></AdminPageGridView>
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

export default AllProducts;
