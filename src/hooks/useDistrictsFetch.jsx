import axios from "axios";
import { useEffect, useState } from "react";

const useDistrictsFetch = () => {
    const [districts, setDistricts] = useState([]);
  useEffect(() => {
    axios
      .get("https://bdapis.com/api/v1.2/districts")
      .then((res) => setDistricts(res.data.data));
  }, []);
    return districts; 
};

export default useDistrictsFetch;