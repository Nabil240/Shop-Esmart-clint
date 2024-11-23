import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useDashboardData = ({ path, startDate, endDate }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const sDate = new Date(startDate).toISOString();
  const eDate = new Date(endDate).toISOString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(
          `/${path}?startDate=${sDate}&endDate=${eDate}`
        );
        setData(res.data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path, startDate, endDate, axiosSecure, sDate, eDate]);

  return { data, loading };
};

export default useDashboardData;
