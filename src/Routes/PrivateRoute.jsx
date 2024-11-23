import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import WaitingLoader from "../Component/WaitingLoader/WaitingLoader";
import useUserRoleCheck from "../hooks/useUserRoleCheck";

const PrivateRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { userType, isBanned, isRoleLoading } = useUserRoleCheck();
  const isAuthenticated = !!user;

  if (loading) {
    return <WaitingLoader />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={"/login"} replace state={{ from: location.pathname }} />
    );
  }

  if (isRoleLoading) {
    return <WaitingLoader></WaitingLoader>;
  }

  if (isBanned) {
    return <Navigate replace to={"/banned"} />;
  }

  if (allowedRole && !allowedRole.includes(userType)) {
    return <Navigate to={"/"} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
