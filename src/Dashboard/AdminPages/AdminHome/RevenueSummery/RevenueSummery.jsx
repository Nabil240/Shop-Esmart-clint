import useDashboardData from "../../../../hooks/useDashboardData";
import './revenue-summery-style.css';
import { FaMoneyBillWave, FaTags, FaDollarSign, FaGift } from 'react-icons/fa'; 
import { useSpring, animated } from '@react-spring/web';
import WaitingLoader from "../../../../Component/WaitingLoader/WaitingLoader";


const RevenueSummery = ({startDate, endDate}) => {
    const path = 'revenue-summery'; 
   
    const {data, loading} = useDashboardData({path, startDate, endDate}); 
    const {totalRevenue, totalCouponDiscount, totalProfit, totalProductsDiscount} = data; 

    const animatedProps = (value) => useSpring({ number: value, from: { number: 0 }, config: { duration: 3000 } });


   

    return (
        <div className="md:p-6 p-2 rounded-lg shadow-md">
            {loading && <WaitingLoader />}
            <h2 className="text-2xl font-semibold mb-4">Revenue Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total Revenue */}
                <div data-aos="zoom-in" className="total-revenue p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105 bg-green-500">
                    <h3 className="text-lg flex items-center font-semibold text-white">
                        <FaMoneyBillWave className="inline-block mr-2" /> Total Revenue
                    </h3>
                    <p className="text-3xl font-bold text-white">
                        <animated.span>{animatedProps(totalRevenue).number.to(n => n.toFixed(0))}</animated.span> Tk
                    </p>
                </div>

                {/* Total Coupon Discount */}
                <div data-aos="zoom-in" className="total-coupon-discount p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105 bg-blue-500">
                    <h3 className="text-lg flex items-center font-semibold text-white">
                        <FaTags className="inline-block mr-2" /> Total Coupon Discount
                    </h3>
                    <p className="text-3xl font-bold text-white">
                        <animated.span>{animatedProps(totalCouponDiscount).number.to(n => n.toFixed(0))}</animated.span> Tk
                    </p>
                </div>

                {/* Total Profit */}
                <div data-aos="zoom-in" className="total-profit p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105 bg-yellow-500">
                    <h3 className="text-lg flex items-center font-semibold text-white">
                        <FaDollarSign className="inline-block mr-2" /> Total Profit
                    </h3>
                    <p className="text-3xl font-bold text-white">
                        <animated.span>{animatedProps(totalProfit).number.to(n => n.toFixed(0))}</animated.span> Tk
                    </p>
                </div>

                {/* Total Products Discount */}
                <div data-aos="zoom-in" className="total-products-discount p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105 bg-red-500">
                    <h3 className="text-lg flex items-center font-semibold text-white">
                        <FaGift className="inline-block mr-2" /> Total Products Discount
                    </h3>
                    <p className="text-3xl font-bold text-white">
                        <animated.span>{animatedProps(totalProductsDiscount).number.to(n => n.toFixed(0))}</animated.span> Tk
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RevenueSummery;