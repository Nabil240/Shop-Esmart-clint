import { useEffect, useState } from "react";
import EmptyPage from "../../../Component/EmptyPage/EmptyPage";
import LoadMoreButton from "../../../Component/LoadMoreButton/LoadMoreButton";
import SearchTextButton from "../../../Component/SearchTextButton/SearchTextButton";
import TransactionView from "./TransactionView";
import useOrdersFetch from "../../../hooks/useOrdersFetch";
import { useParams } from "react-router-dom";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";
import { animated } from "@react-spring/web";
import { animatedProps } from "../../../utils/modules";

const Transactions = () => {
    const {TxID} = useParams(); 
    const route = "orders-transaction";
   
    const [searchText, setSearchText] = useState('');
    const [dataLoad, setDataLoad] = useState(10);
    
    const { orders, isPending, totalResult, refetch } = useOrdersFetch({
      route,
      searchText,
      dataLoad,
    });
  
    
  
    useEffect(() => {
        if(TxID){
            setSearchText(TxID)
        }
        
      if(!isPending){
        refetch();
      }
    }, [searchText, isPending, dataLoad, refetch, TxID]);

    return (
        <div>
      <h2 className="text-2xl md:text-4xl text-center py-4">All Transaction <animated.span>
          {animatedProps(totalResult).number.to((n) => n.toFixed(0))}
        </animated.span></h2>

      {isPending && <WaitingLoader></WaitingLoader>}
      <SearchTextButton  setSearchText={setSearchText}></SearchTextButton>

      {
        totalResult > 0 ? <div>
        {orders?.map((transaction) => (
          <TransactionView key={transaction._id}  transaction={transaction}></TransactionView>
        ))}
      </div> : <EmptyPage></EmptyPage>
      }

      {(totalResult > 10 && orders.length !== totalResult) && (
        <LoadMoreButton
          setDataLoad={setDataLoad}
          isPending={isPending}
        ></LoadMoreButton>
      )}
    </div>
    );
};

export default Transactions;