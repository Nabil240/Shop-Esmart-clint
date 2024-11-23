import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useCategoryReletedProductsFatch = ({
  category = "all",
  currentPage = 0,
  itemPerPage = 10,
  priceRange,
  sort = "date_asc",
}) => {
  const page = Number(currentPage);
  const size = Number(itemPerPage);
  const min = priceRange.min || 0;
  const max = priceRange.max || 9999999;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        await axiosPublic
          .get(
            `/products?category=${category}&page=${page}&size=${size}&min=${min}&max=${max}&sort=${sort}`
          )
          .then((res) => {
            setData(res.data);
           
          });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [axiosPublic, category, page, size, min, max, priceRange, sort]);

  return {
    collections: data?.products,
    numberOfPage: data?.numberOfPage,
    totalResults: data?.totalResults,
    isLoading,
  };
};

export default useCategoryReletedProductsFatch;
