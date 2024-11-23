import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { confirmAlert, confirmationAlert, failedAlert } from "../../../Component/SweetAlart/SweelAlart";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";
import { Link } from "react-router-dom";
import { timeCoverterGMTtoLocal } from "../../../utils/modules";

const ProcessingOrderView = ({ order, refetch }) => {
  const {
    TxID,
    card_issuer,
    carts,
    city,
    couponCode,
    createdAt,
    currency,
    currency_amount,
    discount,
    due,
    email,
    name,
    payment,
    paymentMethod,
    payment_status,
    phone,
    shippigMethod,
    shippingValue,
    totalPrice,
    totalQuantity,
    note,
    _id,
    country,
    shippingAddress,
    order_status,
    orderStatusHistory,
    finalAmount
  } = order;

  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    confirmationAlert({ confirmButtonText: "Yes! Update" }).then(
      async (result) => {
        if (result.isConfirmed) {
          try {
            setLoading(true);
            const res = await axiosSecure.patch(`/orders-update/${_id}`, {
              new_order_status: newStatus,
              orderStatusChangedBy: user.email,
            });
            if (res.data.modifiedCount > 0) {
              confirmAlert("Order Update Success!");
              refetch();
            }
          } catch (err) {
            failedAlert("Order Update Failed!");
          } finally {
            setLoading(false);
          }
        }
      }
    );
  };

  const handleDeleteOrder = async () => {
    confirmationAlert({}).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/orders-delete/${_id}`);
        if (res.data.deletedCount > 0) {
          confirmAlert("Order Deleted Success!");

          refetch();
        }
      }
    });
  };

  const formatShippingMethod = (method) => {
    if (method?.includes("Outside Dhaka")) return "Outside Dhaka";
    if (method?.includes("Inside Dhaka")) return "Inside Dhaka";
    if (method?.includes("Office Delivery")) return "Office Delivery";
    return "Unknown Shipping Method";
  };

  return (
    <div className="bg-gray-100 dark:border-white border-black border dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4 md:p-6">
      {/* Order Header */}
      {loading && <WaitingLoader></WaitingLoader>}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-2 mb-2">
        <div className="mb-4 md:mb-0 md:w-[70%]">
          <h2 className="text-lg font-semibold dark:text-gray-100">
            Order ID: {_id}
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Order Approved By :{" "}
            {orderStatusHistory?.map(status => <span className="me-3 text-green-400" key={status}> {status.changedBy}</span>)}
          </div>
          {TxID ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Transaction ID:{" "}
              <Link
                to={`/dashboard/transactions/${TxID}`}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                {TxID}
              </Link>{" "}
              <span> ({payment_status})</span>
            </p>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Transaction ID: N/A
            </p>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Order Date: {timeCoverterGMTtoLocal(createdAt)}
          </p>
          {currency_amount ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Payment: {currency_amount} {currency} ({payment})
            </p>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Payment: Unpaid
            </p>
          )}
          {card_issuer ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Payment By: {card_issuer}
            </p>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Via Payment: N/A
            </p>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
            Payment Method: {paymentMethod}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
            Customer Requirement: {note ? note : "N/A"}
          </p>
        </div>

        {/* Customer Information */}
        <div>
          <p className="text-sm dark:text-gray-100">
            Customer: <span className="font-semibold">{name}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Phone: {phone}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Email: {email}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            City: {city}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Shipping: {formatShippingMethod(shippigMethod)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Shipping Charge: {shippingValue} Tk
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Shipping Address: {shippingAddress} - {city} - {country}
          </p>
        </div>
      </div>

      {/* Product List */}
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2 dark:text-gray-100">
          Products
        </h3>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-2">
          {carts?.map((product, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-md"
            >
              <div className="flex items-center">
                <img
                  src={product.productIamge}
                  alt="product"
                  className="w-16 h-16 object-cover rounded mr-3"
                />
                <div>
                  <Link
                    to={`/dashboard/admin/products/${product.product_id}`}
                    className="text-blue-500 hover:underline dark:text-blue-300"
                  >
                    View
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Price: {product.productPrice} BDT
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quantity: {product.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="flex justify-between md:items-start items-center mb-4">
        <div>
          <p className="text-sm dark:text-gray-100">
            Total Quantity: {totalQuantity}
          </p>
          {discount ? (
            <p className="text-sm dark:text-gray-100">
              Discount: {discount} BDT
            </p>
          ) : (
            <p className="text-sm dark:text-gray-100">Discount: 00 BDT</p>
          )}
          {couponCode ? (
            <p className="text-sm dark:text-gray-100">
              Coupon: <span className="uppercase">{couponCode}</span>
            </p>
          ) : (
            <p className="text-sm dark:text-gray-100">
              Coupon: <span className="uppercase">N/A</span>
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="md:text-base text-sm font-bold dark:text-gray-100">
            Total: {totalPrice} BDT
          </p>
          <p className="md:text-base text-sm font-bold dark:text-gray-100">
            Final Amount: {finalAmount} BDT
          </p>

          <p className="md:text-2xl text-lg text-[#ff3811]">Due: {due} BDT</p>
        </div>
      </div>

      {/* Order Management Controls */}
      <div className="flex justify-between items-center">
          <select
            onChange={handleStatusChange}
            className="select  outline-none text-xl text-center w-full max-w-xs dark:bg-gray-700 dark:text-gray-100"
          >
            <option className="text-green-500 text-xl" value={order_status}>
              {order_status}
            </option>
            <option className="text-blue-500 text-xl" value="Delivered">
              Delivered
            </option>
            <option className="text-yellow-500 text-xl" value="Return">
              Return
            </option>
            <option className="text-red-500 text-xl" value="Cancel">
              Cancel
            </option>
          </select>
        

        <button
          onClick={handleDeleteOrder}
          className="px-4 py-2 ml-4 rounded-lg bg-[#ff3811] hover:bg-red-700 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProcessingOrderView;
