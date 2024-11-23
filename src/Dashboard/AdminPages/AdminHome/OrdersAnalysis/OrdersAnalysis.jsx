import WaitingLoader from "../../../../Component/WaitingLoader/WaitingLoader";
import useDashboardData from "../../../../hooks/useDashboardData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const OrdersAnalysis = ({ startDate, endDate }) => {
  const path = "orders-analysis";
  const { data, loading } = useDashboardData({ path, startDate, endDate });


  return (
    <div className="">
      {loading && <WaitingLoader></WaitingLoader>}
      <h2 className="text-2xl md:px-6 px-2 font-semibold mb-4">Order Analysis</h2>
      <ResponsiveContainer   width="100%"  height={window.innerWidth < 540 ? 200 : 300}>
        <LineChart
         className={"!-ml-8"}
         margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
         data={data}
        >
          <CartesianGrid strokeDasharray="0 1" />
          <XAxis  dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="linear"
            dataKey="totalOrders"
            stroke="#3b82f6"
            activeDot={{ r: 8 }}
          />
          <Line type="linear" dataKey="deliveredOrders" stroke="#22c55e" />
          <Line type="linear" dataKey="cancelOrders" stroke="#eab308" />
          <Line type="linear" dataKey="returnOrders" stroke="#ff0000" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersAnalysis;
