import { useEffect, useState } from "react";
import LoadMoreButton from "../../../Component/LoadMoreButton/LoadMoreButton";
import SearchTextButton from "../../../Component/SearchTextButton/SearchTextButton";
import CancelOrderView from "./CancelOrderView";
import useOrdersFetch from "../../../hooks/useOrdersFetch";
import EmptyPage from "../../../Component/EmptyPage/EmptyPage";
import { animated } from "@react-spring/web";
import { animatedProps } from "../../../utils/modules";

const CanceledOrders = () => {
  const route = "orders-cancel";
  const [searchText, setSearchText] = useState("");
  const [dataLoad, setDataLoad] = useState(10);

  const { orders, isPending, totalResult, refetch } = useOrdersFetch({
    route,
    searchText,
    dataLoad,
  });

  useEffect(() => {
    refetch();
  }, [searchText, dataLoad, refetch]);

  return (
    <div>
      <h2 className="text-2xl md:text-4xl text-center py-4">
        Cencel Orders{" "}
        <animated.span>
          {animatedProps(totalResult).number.to((n) => n.toFixed(0))}
        </animated.span>
      </h2>

      <SearchTextButton setSearchText={setSearchText}></SearchTextButton>

      {totalResult ? (
        <div>
          {orders?.map((order) => (
            <CancelOrderView
              key={order._id}
              refetch={refetch}
              order={order}
            ></CancelOrderView>
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

export default CanceledOrders;
