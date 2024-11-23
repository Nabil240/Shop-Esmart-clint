import { useState } from "react";
import DatePicker from "../../../../Component/DatePicker/DatePicker";
import OrderSummery from "../OrderSummery/OrderSummery";
import RevenueSummery from "../RevenueSummery/RevenueSummery";
import ExtendedSummery from "./ExtendedSummery/ExtendedSummery";
import OrdersAnalysis from "../OrdersAnalysis/OrdersAnalysis";
import useUserRoleCheck from "../../../../hooks/useUserRoleCheck";
import WaitingLoader from "../../../../Component/WaitingLoader/WaitingLoader";

const AdminHome = () => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 28))
  );
  const [endDate, setEndDate] = useState(new Date());
  const { userType, isRoleLoading } = useUserRoleCheck();

  // console.log('start date', startDate, 'end Date', endDate);

  return (
    <div className="md:mx-8 mx-2">
      {isRoleLoading && <WaitingLoader></WaitingLoader>}
      <div className="">
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        ></DatePicker>
      </div>
      <h2 className="text-2xl md:text-4xl text-center py-4">
        Welcome to Admin Dashboard
      </h2>

      <div className="space-y-4">
        <div data-aos="fade-up">
          <OrdersAnalysis startDate={startDate} endDate={endDate} />
        </div>
        <div>
          <OrderSummery startDate={startDate} endDate={endDate} />
        </div>
        {(userType === "manager" || userType === "admin") && (
          <div>
            <RevenueSummery startDate={startDate} endDate={endDate} />
          </div>
        )}
        {(userType === "manager" || userType === "admin") && (
          <div>
            <ExtendedSummery startDate={startDate} endDate={endDate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
