import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const colors = ["#00C49F", "#0088FE",  "#FFBB28", "#FF8042", "red", "pink"];

const TrendingProductsChart = ({ data }) => {
  const chartData = data?.map((product) => ({
    productCode: product.productCode?.toUpperCase(),
    totalSold: product.totalSold,
    finalPrice: product.finalPrice,
    image: product.images[0]?.image_url,
    id: product._id,
    Total_Ratings : product?.totalRatingsCount,
    averageRating : product.averageRating > 0 ? Number(product.averageRating).toFixed(1) : 0,
  }));

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h3 className="text-xl font-semibold mb-4">Trending Products</h3>
      <ResponsiveContainer
        width={window.innerWidth < 540 ? 400 : 800}
        height={window.innerWidth < 540 ? 200 : 300}
      >
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 40, left: 0, bottom: 5 }}
        >
          <CartesianGrid />
          <XAxis dataKey="productCode" />
          <YAxis dataKey={'Total_Ratings'}/>
          <Tooltip />
          <Bar dataKey="Total_Ratings" fill="#8884d8">
            {chartData?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
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
              <p className="font-bold uppercase">{product.productCode}</p>
              <p>Total Sold: {product.totalSold}</p>
              <p>Rating: {product.averageRating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProductsChart;
