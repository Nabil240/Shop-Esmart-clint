import { Link, useNavigate} from "react-router-dom";
import useUserRoleCheck from "../../hooks/useUserRoleCheck";

const BannedPage = () => {
    const navigate = useNavigate(); 

  const { isBanned } = useUserRoleCheck();
  if (!isBanned) {
    return navigate('/')
  }
  return (
    <div className="min-h-96 flex items-center justify-center  text-base-content">
      <div className="max-w-md text-center p-6 rounded-lg shadow-lg  bg-white dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-4 text-red-600 dark:text-red-400">
          Access Denied
        </h1>
        <p className="mb-4 text-lg">
          Your account has been banned. Please contact support for further
          assistance.
        </p>
        <Link to="/" className="btn btn-primary mt-4">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default BannedPage;
