import useMyOrders from "../../hooks/useMyOrders";
import OrderDetailsPage from "./OrderDetailsPage";
import EmptyPage from "./../../Component/EmptyPage/EmptyPage";
import WaitingLoader from "./../../Component/WaitingLoader/WaitingLoader";
import { animated } from "@react-spring/web";
import { animatedProps } from "../../utils/modules";

const MyOrders = () => {
  const order_status = "current_orders";
  const { orders, loading , refetch} = useMyOrders({ order_status });

  return (
    <div className="min-h-96">
      <h2 className="md:text-4xl text-2xl text-center my-3 md:my-6">
        My <animated.span>
              {animatedProps(orders.length).number.to((n) => n.toFixed(0))}
            </animated.span> Orders Placed!
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

export default MyOrders;
