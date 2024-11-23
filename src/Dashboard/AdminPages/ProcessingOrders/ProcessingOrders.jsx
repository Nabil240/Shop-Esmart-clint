import { useEffect, useState } from "react";
import { animated } from "@react-spring/web";
import useOrdersFetch from "../../../hooks/useOrdersFetch";
import { animatedProps } from "../../../utils/modules";
import SearchTextButton from "../../../Component/SearchTextButton/SearchTextButton";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";
import EmptyPage from "../../../Component/EmptyPage/EmptyPage";
import LoadMoreButton from "../../../Component/LoadMoreButton/LoadMoreButton";
import ProcessingOrderView from "./ProcessingOrderView";

const ProcessingOrders = () => {
  const route = "orders-processing";
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
        On Curiar Orders{" "}
        <animated.span>
          {animatedProps(totalResult).number.to((n) => n.toFixed(0))}
        </animated.span>
      </h2>

      <SearchTextButton setSearchText={setSearchText}></SearchTextButton>
      {isPending && <WaitingLoader></WaitingLoader>}

      {totalResult > 0 ? (
        <div>
          {orders?.map((order) => (
            <ProcessingOrderView
              key={order._id}
              refetch={refetch}
              order={order}
            ></ProcessingOrderView>
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

export default ProcessingOrders;
