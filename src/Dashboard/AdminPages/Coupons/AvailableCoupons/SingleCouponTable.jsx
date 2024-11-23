import {
  confirmAlert,
  confirmationAlert,
} from "../../../../Component/SweetAlart/SweelAlart";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const SingleCouponTable = ({
  coupon,
  index,
  refetch,
  setIsUpdate,
  setUpdateId,
}) => {
  const axiosSecure = useAxiosSecure();

  const {
    coupon_code,
    coupon_type,
    discount_value,
    max_discount,
    min_purchase_amount,
    start_date,
    end_date,
    total_limit,
    coupon_status,
    description,
    specific_user,
    created_by,
    total_count,
    createdAt,
    usage,
    _id,
  } = coupon;

  const formatDate = (date) => new Date(date).toLocaleDateString();

  const handleCouponDelete = (_id) => {
    confirmationAlert({}).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/coupons-delete/${_id}`);

        if (res.data.deletedCount > 0) {
          confirmAlert("Coupon Delete Success");
          refetch();
        }
      }
    });
  };
  const currentDate = new Date();

  return (
    <tr className="dark:hover:bg-gray-700 border-y hover:bg-gray-100 text-center">
      <td>
        {new Date(end_date) < currentDate ? (
          <span className="text-red-600 bg-red-100 px-3 font-bold py-1">
            Expired
          </span>
        ) : (
          <span className="text-green-600 bg-green-100  px-5 font-bold py-1">
            Valid
          </span>
        )}
      </td>
      <td>{formatDate(createdAt)}</td>
      <td>{index}</td>
      <td>
        {coupon_status ? (
          <span className="text-green-500">Active</span>
        ) : (
          <span className="text-red-500">Disabled</span>
        )}
      </td>
      <td className="uppercase">{coupon_code}</td>
      <td>{coupon_type}</td>
      <td>{discount_value}</td>
      <td className="text-nowrap">{description}</td>
      <td>{max_discount}</td>
      <td>{min_purchase_amount}</td>
      <td>{formatDate(start_date)}</td>
      <td>{formatDate(end_date)}</td>
      {specific_user.length > 0 ? (
        <td>
          <details className="px-2 py-1 relative">
            <summary className="z-10 text-nowrap">
              Show Users {specific_user.length}
            </summary>
            <ul className="z-30 p-1 absolute dark:bg-white bg-gray-700 text-white dark:text-black">
              {specific_user.map((user) => (
                <li
                  className="px-2 py-1 dark:hover:bg-gray-200 hover:bg-gray-500"
                  key={user}
                >
                  {user}
                </li>
              ))}
            </ul>
          </details>
        </td>
      ) : (
        <td>Everyone</td>
      )}
      <td>{usage?.limit}</td>
      <td>{total_limit}</td>
      <td>{total_count}</td>
      <td>{created_by}</td>
      <td>
        <button
          onClick={() => {
            setIsUpdate(true), setUpdateId(_id);
          }}
          className="bg-blue-500 px-2 text-white py-1"
        >
          Update
        </button>
      </td>
      <td>
        <button
          onClick={() => handleCouponDelete(_id)}
          className="bg-[#ff3811] px-2 text-white py-1"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SingleCouponTable;
