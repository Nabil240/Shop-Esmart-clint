import { Rating } from "@smastrom/react-rating";
import WaitingLoader from "../../../../../Component/WaitingLoader/WaitingLoader";
import useDashboardData from "../../../../../hooks/useDashboardData";
import CategoryWiseSalesChart from "./Charts/CategoryWiseSalesChart";
import LowStockAlertsChart from "./Charts/LowStockAlertsChart";
import TopSellingProductsChart from "./Charts/TopSellingProductsChart";
import TrendingProductsChart from "./Charts/TrendingProductsChart";

const ExtendedSummery = ({ startDate, endDate }) => {
  const path = "extended-summary";

  const { data, loading } = useDashboardData({ path, startDate, endDate });
  const {
    topSellingProducts,
    trendingProducts,
    lowStockAlerts,
    categoryWiseSales,
    ratings,
  } = data;

  return (
    <div className="md:p-6 p-2 mb-10 rounded-lg shadow-md">
      {loading && <WaitingLoader></WaitingLoader>}
      <h2 className="text-2xl font-semibold mb-4">Extended Summary</h2>

      <div className="flex flex-col items-center">
        <div data-aos="fade-up" className="mb-6">
          <TopSellingProductsChart data={topSellingProducts} />
        </div>
        <div data-aos="fade-up" className="mb-6">
          <TrendingProductsChart data={trendingProducts} />
        </div>
        <div data-aos="fade-up" className="mb-6">
          <LowStockAlertsChart data={lowStockAlerts} />
        </div>
        <div data-aos="fade-up" className="mb-6 grid md:grid-cols-2 gap-4  ">
          <CategoryWiseSalesChart data={categoryWiseSales} />
          <div className="">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Site Ratings
            </h3>
            <div className="flex flex-col justify-center items-center gap-1">
              <span className="flex flex-col justify-center items-center text-xs md:text-lg min-h-80">
                <Rating
                  className="md:max-w-[300px] max-w-56"
                  value={ratings?.siteAverageRatings}
                  readOnly
                />

                <span className="text-lg md:text-2xl">
                  {ratings?.siteAverageRatings?.toFixed(1)} - (
                  {ratings?.totalRatingsCount})
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendedSummery;
