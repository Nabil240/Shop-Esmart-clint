import { useEffect } from "react";
import { MdWarning } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const status = searchParams.get("status");

  useEffect(() => {
    if (!status) {
      return navigate("/");
    }
  }, [status, navigate]);
  return (
    <div className="min-h-96 flex flex-col justify-center items-center gap-4">
      
      <p className="text-[120px] flex items-center justify-center text-orange-400">
      <MdWarning />
      </p>
      <h3 className="text-center md:text-4xl text-3xl font-bold text-orange-500">
        Payment Failed!
      </h3>
      <p className="text-center underline text-blue-400">
        <Link to={'/carts'}>
            Try Again
        </Link>
      </p>
    </div>
  );
};

export default PaymentFailed;
