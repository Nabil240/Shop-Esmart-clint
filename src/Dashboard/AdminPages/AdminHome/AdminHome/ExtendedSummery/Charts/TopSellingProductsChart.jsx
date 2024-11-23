import { Link } from "react-router-dom";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const colors = ["#FFBB28",  "red", "pink", "#00C49F","#0088FE" , "#FF8042", "#FF3811"];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const TopSellingProductsChart = ({ data }) => {
  const chartData = data?.map((product) => ({
    productCode: product?.productCode?.toUpperCase(),
    totalSold: product.totalSold,
    finalPrice: product.finalPrice,
    image: product.images[0]?.image_url, // প্রথম ইমেজ
    id: product._id,
  }));

  return (
    <div className="flex flex-col justify-center items-center md:px-4">
      <h3 className="text-xl font-semibold mb-4">Top Selling Products</h3>
      <BarChart
        width={window.innerWidth < 540 ? 400 : 800} // Responsive width
        height={window.innerWidth < 540 ? 200 : 300}
        data={chartData}
        margin={{
          top: 20,
          right: 40,
          left: 0,
          bottom: 2,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="productCode" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="totalSold"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {chartData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
      <div className="flex items-center gap-3 justify-center flex-wrap p-2">
        {chartData?.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-center items-center"
          >
            <Link to={`/dashboard/admin/products/${product.id}`}>
              <img
                src={product.image}
                alt={product.productCode}
                className="w-16 h-16 md:w-20 md:h-20 rounded-md cursor-pointer"
              />
            </Link>
            <div className="text-center text-sm">
              <p className="font-bold">{product.productCode}</p>
              <p>Price: {product.finalPrice} Tk</p>
              <p>Total Sold: {product.totalSold}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProductsChart;
