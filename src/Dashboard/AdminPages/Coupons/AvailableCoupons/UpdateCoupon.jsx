import { useEffect, useState } from "react";
import ReactTagInput from "../../../../Component/ReactTagInput/ReactTagInput";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import WaitingLoader from "../../../../Component/WaitingLoader/WaitingLoader";
import {
  confirmAlert,
  failedAlert,
} from "../../../../Component/SweetAlart/SweelAlart";

const UpdateCoupon = ({ setIsUpdate, updateId, refetch }) => {
  const [coupon, setCoupon] = useState([]);
  const [newUserList, setNewUserList] = useState([]);
  const [finalUserList, setFinalUserList] = useState([]);
  const [formReset, setFormReset] = useState(false);
  const [loading, setLoading] = useState(false);

  const axisoSecure = useAxiosSecure();

  useEffect(() => {
    try {
      setLoading(true);
      axisoSecure.get(`/coupons/${updateId}`).then(async (res) => {
        setCoupon(res.data);
      });
    } finally {
      setLoading(false);
    }
  }, [updateId, axisoSecure]);

  useEffect(() => {
    if (coupon.specific_user?.length > 0) {
      setFinalUserList(coupon.specific_user);
    }
  }, [coupon.specific_user]);


  const handleCouponUpdate = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const coupon_code = form.get("coupon_code").toLowerCase();
    const coupon_type = form.get("coupon_type");
    const discount_value = Number(form.get("discount_value"));
    const max_discount = Number(form.get("max_discount")) || 0;
    const min_purchase_amount = Number(form.get("min_purchase_amount")) || 0;
    let start_date = new Date(form.get("start_date"));
    let end_date = new Date(form.get("end_date"));
    if (start_date > end_date) {
      [start_date, end_date] = [end_date, start_date];
    }
    const per_user_limit = Number(form.get("per_user_limit")) || 0;
    const total_limit = Number(form.get("total_limit")) || 0;
    const coupon_status = form.get("coupon_status") === "true";
    const description = form.get("description");
    const newUsers = newUserList.map((email) => email.text);
    const created_by = form.get("created_by");

    const updateCoupons = {
      coupon_code,
      coupon_type,
      discount_value,
      max_discount,
      min_purchase_amount,
      start_date,
      end_date,
      usage: { limit: per_user_limit , users: coupon.usage.users},
      total_limit,
      coupon_status,
      description,
      specific_user: [...finalUserList, ...newUsers],
      created_by,
      total_count: coupon.total_count
    };
    

    try {
      setLoading(true);
      const res = await axisoSecure.patch(`/coupons/${updateId}`, updateCoupons);
      if (res.data.modifiedCount  > 0) {
        confirmAlert("Coupon Update Success!");
        setIsUpdate(false);
        setFormReset(true)
        refetch();
      }
      else if(res.data.modifiedCount === 0 && res.data.matchedCount > 0){
        confirmAlert("Coupon Data No Change!");
        setIsUpdate(false);
        setFormReset(true)
        refetch();
      }
    } catch (err) {
      failedAlert("Coupon Update Failed!");
    } finally {
      setLoading(false);
    }
  };

  console.log(coupon)
  

  const handleUserDelete = (userRemove) => {
    const remainingUser = finalUserList.filter((user) => user !== userRemove);
    setFinalUserList(remainingUser);
  };
  return (
    <div className="my-8">
      {loading && <WaitingLoader></WaitingLoader>}
      <h2 className="text-2xl md:text-4xl text-center my-4">Update a Coupon</h2>
      <form
        onSubmit={handleCouponUpdate}
        className="grid md:grid-cols-5 grid-cols-2 gap-2"
      >
        <div className="space-y-1">
          <label htmlFor="coupon_code">Coupon Code*</label>
          <input
            type="text"
            name="coupon_code"
            defaultValue={coupon?.coupon_code}
            required
            className="w-full py-1 border border-blue-500 outline-none px-2"
            placeholder="Coupon Code..."
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="coupon_type">Coupon Type*</label>
          <select
            defaultValue={coupon?.coupon_type}
            name="coupon_type"
            className="w-full py-[6px] border capitalize border-blue-500 outline-none px-2"
          >
            <option value={coupon?.coupon_type}>{coupon.coupon_type}</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixid Amount</option>
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="discount_value">Discount Value*</label>
          <input
            type="number"
            name="discount_value"
            min={0}
            defaultValue={coupon?.discount_value}
            required
            className="w-full py-1 border border-blue-500 outline-none px-2"
            placeholder="Value 10% or 100tk"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="max_discount">Max Discount for % </label>
          <input
            type="number"
            name="max_discount"
            defaultValue={coupon?.max_discount}
            min={0}
            className="w-full py-1 border border-blue-500 outline-none px-2"
            placeholder="if % Set Max Value"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="min_purchase_amount">Min Purchase Amount</label>
          <input
            min={0}
            type="number"
            defaultValue={coupon?.min_purchase_amount}
            name="min_purchase_amount"
            className="w-full py-1 border border-blue-500 outline-none px-2"
            placeholder="Minimum Purchase.."
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="start_date">Start Date*</label>
          <input
            type="date"
            name="start_date"
            required
            defaultValue={
              coupon?.start_date
                ? new Date(coupon.start_date).toISOString().substring(0, 10)
                : ""
            }
            className="w-full py-1 border border-blue-500 outline-none px-2"
            placeholder="Start Date.."
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="end_date">End Date*</label>
          <input
            type="date"
            name="end_date"
            required
            defaultValue={
              coupon?.end_date
                ? new Date(coupon.end_date).toISOString().substring(0, 10)
                : ""
            }
            className="w-full py-1 border border-blue-500 outline-none px-2"
            placeholder="End Date"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="per_user_limit">Usage Limit per User</label>
          <input
            type="number"
            defaultValue={coupon?.usage?.limit}
            name="per_user_limit"
            className="w-full py-1 border border-blue-500 outline-none px-2"
            placeholder="Per User Limit Set.."
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="total_limit">Total Usage Limit</label>
          <input
            type="number"
            name="total_limit"
            defaultValue={coupon?.total_limit}
            className="w-full py-1 border border-blue-500 outline-none px-2"
            placeholder="Overall Total Limit Set.."
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="coupon_status">Coupon Status*</label>
          <select
            required
            name="coupon_status"
            defaultValue={coupon?.coupon_status}
            className="w-full py-[6px] border border-blue-500 outline-none px-2"
          >
            <option value={coupon?.coupon_status}>
              {coupon?.coupon_status ? "Active" : "Inactive"}
            </option>
            <option value="">Set Coupon Status</option>
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>
        <div className="space-y-1 col-span-2">
          <label htmlFor="description">Coupon Description</label>
          <input
            type="text"
            defaultValue={coupon?.description}
            name="description"
            className="w-full py-1 border border-blue-500 outline-none px-2"
            placeholder="About This Coupon.."
          />
        </div>
        <div className="space-y-1 col-span-2">
          <label htmlFor="specific_user">Specific User Email</label>
          <ReactTagInput
            setCollectProductTags={setNewUserList}
            formReset={formReset}
          />

          {finalUserList?.length > 0 && (
            <details className="">
              <summary>Show Users</summary>
              <ul className=" grid-cols-2 grid gap-2">
                {finalUserList?.map((user, index) => (
                  <li
                    className="py-1 px-2 hover:text-white hover:bg-blue-500 flex justify-between items-center"
                    key={index}
                  >
                    {user}{" "}
                    <span
                      className="cursor-pointer"
                      onClick={() => handleUserDelete(user)}
                    >
                      X
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
        <div className="space-y-1 col-span-2 md:col-span-1">
          <label htmlFor="created_by">Coupon Created By</label>
          <input
            type="email"
            required
            readOnly
            name="created_by"
            defaultValue={coupon.created_by}
            className="w-full py-1 border border-blue-500 outline-none px-2"
            placeholder="Coupon Created By."
          />
        </div>

        <div className="md:col-span-5 col-span-2 flex justify-center my-5">
          <input
            className="md:w-[30%] w-[70%]  bg-[#ff3811] hover:bg-red-700 text-white py-1 text-center"
            type="submit"
            value="Coupon Update"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateCoupon;
