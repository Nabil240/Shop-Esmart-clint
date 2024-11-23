import { useEffect, useState } from "react";
import useCoupons from "../../../../hooks/useCoupons";
import SingleCouponTable from "./SingleCouponTable";
import WaitingLoader from "../../../../Component/WaitingLoader/WaitingLoader";
import EmptyPage from './../../../../Component/EmptyPage/EmptyPage';
import UpdateCoupon from "./UpdateCoupon";

const AvailableCoupons = () => {
  const [searchText, setSearchText] = useState("");

  const { coupons, isPending, refetch } = useCoupons({ searchText });
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(''); 



  const handleCouponSearch = (e) => {
    e.preventDefault();
    setSearchText(e?.target?.coupon_code.value);
  };

  useEffect(() => {
    refetch();
  }, [refetch, searchText]);

  return (
    <div>
      {isPending && <WaitingLoader></WaitingLoader>}
      <h2 className="text-2xl md:text-4xl text-center my-4">
        Available Coupons {coupons.length}
      </h2>
      <div className="md:w-96 w-80 mx-auto mb-6">
        <form onSubmit={handleCouponSearch} className="flex">
          <input
            type="text"
            name="coupon_code"
            className="w-full border-b outline-none py-1 px-2"
            placeholder="Search Coupon Code...."
          />
          <button className="px-4 py-1 bg-red-500 hover:bg-red-700 text-white">
            Search
          </button>
        </form>
      </div>

      {
        coupons.length > 0 ? <div className="overflow-y-auto pb-10">
        <table className="table-xs">
          <thead className="">
            <tr className="text-nowrap">
              <th>Validity</th>
              <th>Created Date</th>
              <th>SL</th>
              <th>Status</th>
              <th>Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Description</th>
              <th>Max Dis</th>
              <th>Min Pur</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Specific user</th>
              <th>User Limit</th>
              <th>Total Limit</th>
              <th>Total Count</th>
              <th>Created By</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <SingleCouponTable
                key={index}
                refetch={refetch}
                coupon={coupon}
                index={index + 1}
                setIsUpdate={setIsUpdate}
                setUpdateId={setUpdateId}
              ></SingleCouponTable>
            ))}
          </tbody>
        </table>
      </div> : <EmptyPage></EmptyPage>
      }

        {
            isUpdate && <UpdateCoupon setIsUpdate={setIsUpdate} updateId={updateId} refetch={refetch}></UpdateCoupon>
        }

    </div>
  );
};

export default AvailableCoupons;
