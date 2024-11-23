import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";

const useUserRoleCheck = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [userType, setUserType] = useState("");
  const [isBanned, setIsBanned] = useState(false);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    if (!loading && user?.email) {
      setIsRoleLoading(true);
      axiosSecure
        .post("/users/type")
        .then((res) => {
          setUserType(res.data.type);
          setIsBanned(res.data.isBanned);
          setIsRoleLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user role: ", err);
          setIsRoleLoading(false);
        });
    }
  }, [axiosSecure, user, loading]);

  return { userType, isBanned, isRoleLoading };
};

export default useUserRoleCheck;
