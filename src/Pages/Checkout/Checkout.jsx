import { useLocation, useNavigate } from "react-router-dom";
import HomeAndBackButton from "../../Component/HomeAndBackButton/HomeAndBackButton";
import PaymentMethod from "./CheckoutComponents/PaymentMethod";
import ReviewOrder from "./CheckoutComponents/ReviewOrder";
import ShippingAddress from "./CheckoutComponents/ShippingAddress";
import { useEffect, useState } from "react";

const Checkout = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const {orderData} = location.state || {}; 
  const [shippingInfo, setShippingInfo] = useState({}); 

  useEffect(()=>{
    if(!orderData){
      navigate('/')
    }
  },[orderData, navigate]); 

  if(!orderData){
    return null
  }
  
  
  
  return (
    <div className="md:max-w-6xl mx-auto md:px-0 mt-3 min-h-96">
      <HomeAndBackButton></HomeAndBackButton>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
        <div>
          <ReviewOrder orderData={orderData}></ReviewOrder>
        </div>
        <div>
          <ShippingAddress setShippingInfo={setShippingInfo}></ShippingAddress>
        </div>
        <div>
          <PaymentMethod orderData={orderData} shippingInfo={shippingInfo}></PaymentMethod>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
