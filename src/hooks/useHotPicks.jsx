import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useHotPicks = ({ path, dataLoad = 10 }) => {
  const axiosPublic = useAxiosPublic();
  const [collections, setCollections] = useState([]);
  const [totalResult, setTotalResult] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHotPicks = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/${path}?dataLoad=${dataLoad}`);
        setCollections(res.data.productResults);
        setTotalResult(res.data.totalResult);
      } catch (err) {
        console.error("Fetching Error");
      } finally {
        setLoading(false);
      }
    };
    fetchHotPicks();

  }, [axiosPublic, path, dataLoad]);

  return { collections, totalResult, loading };
};

export default useHotPicks;
