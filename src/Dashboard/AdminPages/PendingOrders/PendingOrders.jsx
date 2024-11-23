import { useEffect, useState } from "react";
import useOrdersFetch from "../../../hooks/useOrdersFetch";
import LoadMoreButton from "../../../Component/LoadMoreButton/LoadMoreButton";
import SearchTextButton from "../../../Component/SearchTextButton/SearchTextButton";
import PendingOrderView from "./PendingOrderView";
import EmptyPage from "../../../Component/EmptyPage/EmptyPage";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";
import { animatedProps } from "../../../utils/modules";
import { animated } from "@react-spring/web";

const PendingOrders = () => {
  const route = "orders-pending";
  const [searchText, setSearchText] = useState("");
  const [dataLoad, setDataLoad] = useState(10);

  const { orders, isPending, totalResult, refetch } = useOrdersFetch({
    route,
    searchText,
    dataLoad,
  });

  useEffect(() => {
    if (!isPending) {
      refetch();
    }
  }, [searchText, dataLoad, isPending, refetch]);
  
  return (
    <div>
      {isPending && <WaitingLoader></WaitingLoader>}
      <h2 className="text-2xl md:text-4xl text-center py-4">
        Pending Orders{" "}
        <animated.span>
          {animatedProps(totalResult).number.to((n) => n.toFixed(0))}
        </animated.span>
      </h2>

      <SearchTextButton setSearchText={setSearchText}></SearchTextButton>

      {totalResult > 0 ? (
        <div>
          {orders?.map((order) => (
            <PendingOrderView
              key={order._id}
              refetch={refetch}
              order={order}
            ></PendingOrderView>
          ))}
        </div>
      ) : (
        <EmptyPage></EmptyPage>
      )}

      {totalResult > 10 && orders.length !== totalResult && (
        <LoadMoreButton
          setDataLoad={setDataLoad}
          isPending={isPending}
        ></LoadMoreButton>
      )}
    </div>
  );
};

export default PendingOrders;
