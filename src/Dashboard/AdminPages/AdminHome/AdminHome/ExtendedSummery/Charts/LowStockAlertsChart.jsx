
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';



const LowStockAlertsChart = ({data}) => {
    const getColorByStock = (stockQuantity) => {
        if (stockQuantity < 3) return '#FF0000'; // Red for stock less than 3
        if (stockQuantity < 5) return '#FF8042'; // Orange for stock less than 5
        if (stockQuantity < 8) return '#FFBB28'; // Yellow for stock less than 8
        return '#00C49F'; // Green for stock 10 or more
      };


    const chartData = data?.map(product => ({
    productCode: product.productCode.toUpperCase(),
    stockQuantity: product.stockQuantity,
    image: product.images[0]?.image_url,
    finalPrice: product.finalPrice,
    id: product._id,
  }));


    return (
         <div className="flex flex-col justify-center items-center p-4">
      <h3 className="text-xl font-semibold mb-4">Low Stock Products</h3>
      <ResponsiveContainer width={window.innerWidth < 540 ? 400 : 800}
        height={window.innerWidth < 540 ? 200 : 300}>
        <BarChart
          layout="vertical" 
          data={chartData}
          
          margin={{ top: 20, right: 40, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="0 1" />
          <XAxis type="number"  />
          <YAxis type="category"  dataKey="productCode" width={100} />
          <Tooltip />
          <Bar dataKey="stockQuantity" fill="#8884d8" label={{ position: 'right' }}>
            {chartData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColorByStock(entry.stockQuantity)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {/* Displaying product info below the chart */}
      <div className="flex items-center gap-6 justify-center flex-wrap p-2">
        {chartData?.map(product => (
          <div key={product.id} className="flex flex-col justify-center items-center">
            <Link to={`/dashboard/admin/products/${product.id}`}>
            <img
              src={product.image}
              alt={product.productCode}
              className="w-16 h-16 md:w-20 md:h-20 rounded-md cursor-pointer"
            /> </Link>
            <div className="text-center text-sm">
              <p className="font-bold">{product.productCode}</p>
              <p>Stock: {product.stockQuantity}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
    );
};

export default LowStockAlertsChart;