import { useEffect } from "react";
import { MdOutlineDoneOutline } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const paidAmount = searchParams.get("paid-amount");
  const transactionID = searchParams.get("TxID");

 
  useEffect(() => {
    if (!paidAmount || !transactionID) {
      return navigate("/");
    }
  
  }, [navigate, paidAmount, transactionID]);

  return (
    <div className="min-h-96 flex flex-col justify-center items-center gap-4">
      
    <p className="text-[120px] flex items-center  justify-center text-green-500">
    <MdOutlineDoneOutline />

    </p>
    
    <p className="text-center text-4xl  font-bold text-green-500">
      Payment Success!
    </p>
    <p className="text-3xl text-red-500">
        Thank You!
    </p>
    <p className="md:text-xl text-lg">
        Your Paid Amount : {paidAmount} Tk
    </p>
    <p className="md:text-xl text-lg">
        Transaction ID : {transactionID}
    </p>
    <button className="text-center py-2 w-1/2 md:w-[20%] mx-auto bg-green-500 text-white hover:bg-green-700">
      <Link to={'/profile/myOrders'}>
          Go to Your Order
      </Link>
    </button>
  </div>
  );
};

export default PaymentSuccess;
