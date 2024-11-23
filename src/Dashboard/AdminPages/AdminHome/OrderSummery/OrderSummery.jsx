import { Link } from "react-router-dom";
import useDashboardData from "../../../../hooks/useDashboardData";
import WaitingLoader from "../../../../Component/WaitingLoader/WaitingLoader";
import { useSpring, animated } from "@react-spring/web";
import {
  FaBox,
  FaCheckCircle,
  FaTruck,
  FaClipboardList,
  FaUndo,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import "./order-summery-style.css";
import { AiOutlineTransaction } from "react-icons/ai";
import useUserRoleCheck from "../../../../hooks/useUserRoleCheck";

const OrderSummery = ({ startDate, endDate }) => {
  const path = "orders-summery";

  const { data, loading } = useDashboardData({ path, startDate, endDate });

  const {userType} = useUserRoleCheck()

  const {
    totalOrders,
    pendingOrders,
    confirmOrders,
    onCuriarOrders,
    deliveredOrders,
    cancelOrders,
    returnOders,
    totalUsers,
    totalTransaction,
  } = data;

  const animatedProps = (value) =>
    useSpring({
      number: value,
      from: { number: 0 },
      config: { duration: 2000 },
    });

  return (
    <div  className="md:p-6 p-2 rounded-lg shadow-md">
      {loading && <WaitingLoader />}
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Orders */}
        <div data-aos='zoom-in' className="total-orders p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
          <h3 className="text-lg flex items-center font-semibold text-white">
            <FaBox className="inline-block mr-2" /> Total Orders
          </h3>
          <p className="text-3xl font-bold text-white">
            <animated.span>
              {animatedProps(totalOrders).number.to((n) => n.toFixed(0))}
            </animated.span>
          </p>
        </div>

        {/* Pending Orders */}
        <div data-aos='zoom-in' className="pending-orders p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
          <Link to={"/dashboard/pendingOrders"} className="w-full">
            <h3 className="text-lg flex items-center font-semibold text-white">
              <FaClipboardList className="inline-block mr-2" /> Pending Orders
            </h3>
            <p className="text-3xl font-bold text-white">
              <animated.span>
                {animatedProps(pendingOrders).number.to((n) => n.toFixed(0))}
              </animated.span>
            </p>
          </Link>
        </div>

        {/* Confirmed Orders */}
        <div data-aos='zoom-in' className="confirmed-orders p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
          <Link className="w-full" to={"/dashboard/allOrders"}>
            <h3 className="text-lg flex items-center font-semibold text-white">
              <FaCheckCircle className="inline-block mr-2" /> Confirmed Orders
            </h3>
            <p className="text-3xl font-bold text-white">
              <animated.span>
                {animatedProps(confirmOrders).number.to((n) => n.toFixed(0))}
              </animated.span>
            </p>
          </Link>
        </div>

        {/* On Courier Orders */}
        <div data-aos='zoom-in' className="on-courier-orders p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
          <Link className="w-full" to={"/dashboard/processingOrders"}>
            <h3 className="text-lg flex items-center font-semibold text-white">
              <FaTruck className="inline-block mr-2" /> On Courier
            </h3>
            <p className="text-3xl font-bold text-white">
              <animated.span>
                {animatedProps(onCuriarOrders).number.to((n) => n.toFixed(0))}
              </animated.span>
            </p>
          </Link>
        </div>

        {/* Delivered Orders */}
       <div className={`delivered-orders ${(userType==='moderator' || userType==='user') ? 'hidden' : 'visible'} p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105`}>
          <Link className="w-full" to={"/dashboard/completeOrders"}>
            <h3 className="text-lg flex items-center font-semibold text-white">
              <FaCheckCircle className="inline-block mr-2" /> Delivered Orders
            </h3>
            <p className="text-3xl font-bold text-white">
              <animated.span>
                {animatedProps(deliveredOrders).number.to((n) => n.toFixed(0))}
              </animated.span>
            </p>
          </Link>
        </div>

        {/* Cancelled Orders */}
       <div className={`canceled-orders p-4 ${(userType==='moderator' || userType==='user') ? 'hidden' : 'visible'} rounded-lg shadow-md transform transition duration-500 hover:scale-105`}>
          <Link className="w-full" to={"/dashboard/canceledOrders"}>
            <h3 className="text-lg flex items-center font-semibold text-white">
              <FaTimesCircle className="inline-block mr-2" /> Canceled Orders
            </h3>
            <p className="text-3xl font-bold text-white">
              <animated.span>
                {animatedProps(cancelOrders).number.to((n) => n.toFixed(0))}
              </animated.span>
            </p>
          </Link>
        </div>

        {/* Returned Orders */}
        <div className={`returned-orders p-4 ${(userType==='moderator' || userType==='user') ? 'hidden' : 'visible'} rounded-lg shadow-md transform transition duration-500 hover:scale-105`}>
          <Link className="w-full" to={"/dashboard/canceledOrders"}>
            <h3 className="text-lg flex items-center font-semibold text-white">
              <FaUndo className="inline-block mr-2" /> Returned Orders
            </h3>
            <p className="text-3xl font-bold text-white">
              <animated.span>
                {animatedProps(returnOders).number.to((n) => n.toFixed(0))}
              </animated.span>
            </p>
          </Link>
        </div>

        {/* Total Users */}
        <div data-aos='zoom-in' className="total-users p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
          <Link to={"/dashboard/allUsers"}>
            <h3 className="text-lg flex items-center font-semibold text-white">
              <FaUsers className="inline-block mr-2 text-xl" /> Total Users
            </h3>
            <p className="text-3xl font-bold text-white">
              <animated.span>
                {animatedProps(totalUsers).number.to((n) => n.toFixed(0))}
              </animated.span>
            </p>
          </Link>
        </div>

        {/* Total Transactions */}
        <div data-aos='zoom-in' className="total-transaction p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
          <Link to={"/dashboard/transactions"}>
            <h3 className="text-lg flex items-center font-semibold text-white">
              <AiOutlineTransaction className="inline-block text-xl mr-2" />{" "}
              Total Transaction
            </h3>
            <p className="text-3xl font-bold text-white">
              <animated.span>
                {animatedProps(totalTransaction).number.to((n) => n.toFixed(0))}
              </animated.span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
