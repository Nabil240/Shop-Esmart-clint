import { useEffect } from "react";
import { MdCancel, MdOutlineCancelPresentation } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const PaymentCancel = () => {
    const [searchParams] = useSearchParams(); 
    const navigate = useNavigate(); 

    const status = searchParams.get('status'); 
    console.log(status)
   useEffect(()=>{
    if(!status){
        return navigate('/')
    }
   },[status, navigate])
    
    return (
        <div className="min-h-96 flex flex-col justify-center items-center gap-4">
      
        <p className="text-[120px] flex items-center justify-center border-8 border-red-500 rounded-full text-red-500">
        <MdCancel />

        </p>
        <h3 className="text-center md:text-4xl text-3xl font-bold text-red-500">
          Payment Canceled!
        </h3>
        <p className="text-center underline text-blue-400">
          <Link to={'/carts'}>
              Try Again
          </Link>
        </p>
      </div>
    );
};

export default PaymentCancel;