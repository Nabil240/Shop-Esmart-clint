import { useEffect } from "react";
import EmptyPage from "../../Component/EmptyPage/EmptyPage";
import WaitingLoader from "../../Component/WaitingLoader/WaitingLoader";
import useMyOrders from "../../hooks/useMyOrders";
import OrderDetailsPage from "../MyOrders/OrderDetailsPage";
import { animated } from "@react-spring/web";
import { animatedProps } from "../../utils/modules";

const OrdersHistory = () => {
    const order_status = "history";
  const { orders, loading, refetch } = useMyOrders({ order_status });

  useEffect(()=>{
      refetch(); 
  }, [refetch])

    return (
        <div className="min-h-96">
      <h2 className="md:text-4xl text-2xl text-center mt-2 md:mt-3">
        My Orders History!
      </h2>
      <h2 className="md:text-xl text-lg text-center mb-3  md:mt-2 md:mb-5">
        Total Orders <animated.span>
              {animatedProps(orders.length).number.to((n) => n.toFixed(0))}
            </animated.span>
      </h2>
      {loading && <WaitingLoader></WaitingLoader>}

      {orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <OrderDetailsPage refetch={refetch} order={order} key={order._id}></OrderDetailsPage>
          ))}
        </div>
      ) : (
        <EmptyPage></EmptyPage>
      )}
    </div>
    );
};

export default OrdersHistory;