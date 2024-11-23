import { useState } from "react";
import MakeCoupons from "./MakeCoupons";
import AvailableCoupons from "./AvailableCoupons/AvailableCoupons";

const Coupons = () => {
    const [showAndHide, setShowAndHide] = useState(true); 

    return (
        <div className="md:max-w-6xl md:mx-auto mx-2">
            <div className="flex md:gap-4 gap-2 my-4">
            <button onClick={()=>setShowAndHide(true)} className={`w-full py-2 ${showAndHide ? 'bg-green-500 hover:bg-green-700 ' : "bg-[#ff3811] hover:bg-orange-700" }  text-white outline-none`}>Make a Coupon</button>
            <button onClick={()=>setShowAndHide(false)} className={`w-full py-2 ${!showAndHide ? 'bg-green-500 hover:bg-green-700 ' : "bg-[#ff3811] hover:bg-orange-700" }  text-white outline-none`}>Available Coupon</button>
            </div>
           {
            showAndHide ? <MakeCoupons></MakeCoupons> : <AvailableCoupons></AvailableCoupons>
           }

           

        </div>
    );
};

export default Coupons;