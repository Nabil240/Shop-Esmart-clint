import { Link } from "react-router-dom";
import { timeCoverterGMTtoLocal } from "../../../utils/modules";
import { confirmAlert, confirmationAlert } from "../../../Component/SweetAlart/SweelAlart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CancelOrderView = ({ order, refetch }) => {
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
    orderStatusUpdateBy,
    order_status,
    finalAmount,
    orderStatusHistory,
    cancelAt
  } = order;

  const axiosSecure = useAxiosSecure();
 

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
    <div className="bg-gray-100 relative dark:border-white border-black border dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4 md:p-6">
      {/* Order Header */}
      <p className='absolute right-2 md:top-1 top-0 text-blue-500'><span className='block'>{order_status}</span>{timeCoverterGMTtoLocal(cancelAt)}</p>
    
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-2 mb-2">
        <div className="mb-4 md:mb-0 md:w-[70%]">
          <h2 className="text-lg font-semibold dark:text-gray-100">
            Order ID: {_id}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Order Approved By :{" "}
            <span className="text-red-400">{orderStatusUpdateBy}</span>
          </p>
          {TxID ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Transaction ID:{" "}
              <Link to={`/dashboard/transactions/${TxID}`} className="text-blue-500 hover:underline cursor-pointer">{TxID}</Link>{" "}
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
      <div className="md:flex justify-between md:items-start  mb-4">
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

<div>
              Order Status History: {
                orderStatusHistory?.map((status, index) => <p className='' key={index}><span className='font-semibold'>{status.status}</span> - <span>By - {status.changedBy}</span> - <span>Date : {timeCoverterGMTtoLocal(status.timestamp)}</span></p>)
              }
            </div>
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
        <p className="text-red-500 text-xl px-7 py-2 border border-red-500 rounded-lg">
          {order_status}
        </p>

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

export default CancelOrderView;
