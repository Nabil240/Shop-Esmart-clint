import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MySingleCoupons from "./MySingleCoupons";
import { animated } from "@react-spring/web";
import { animatedProps } from "../../utils/modules";
import EmptyPage from "../../Component/EmptyPage/EmptyPage";

const MyCoupons = () => {
  const [myCoupons, setMyCoupons] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/coupons").then((res) => setMyCoupons(res.data));
  }, [axiosSecure]);

  const sortedCoupons = myCoupons.sort((a, b) => {
    const currentDate = new Date();
    const aEndDate = new Date(a.end_date); 
    const bEndDate = new Date(b.end_date); 

   
    const isAExpired = currentDate > aEndDate;
   
    const isBExpired = currentDate > bEndDate;

    
    if (!isAExpired && isBExpired) return -1;
    
    if (isAExpired && !isBExpired) return 1;
    
    return 0;
  });

  return (
    <div className="min-h-96 md:max-w-6xl md:mx-auto mx-2">
      <h2 className="text-center text-2xl md:text-4xl font-semibold md:my-6 my-3">
        <animated.span>
          {animatedProps(myCoupons?.length).number.to((n) => n.toFixed(0))}
        </animated.span>
        -Coupons For Me
      </h2>

      {myCoupons.length > 0 ? (
        <div className="grid md:grid-cols-1 grid-cols-1 gap-3">
          {sortedCoupons.map((coupon) => (
            <MySingleCoupons coupon={coupon} key={coupon._id}></MySingleCoupons>
          ))}
        </div>
      ) : (
        <EmptyPage></EmptyPage>
      )}
    </div>
  );
};

export default MyCoupons;
