import { useState } from "react";
import ProductCard from "./ProductCard ";
import ReviewModal from "../../Component/ReviewModal/ReviewModal";

const OrderDetailsPage = ({ order, refetch }) => {
  const {
    _id,
    TxID,
    card_issuer,
    card_issuer_country,
    carts,
    couponCode,
    createdAt,
    currency,
    discount,
    due,
    finalAmount,
    email,
    name,
    city,
    country,
    order_status,
    paid,
    paymentMethod,
    phone,
    shippingAddress,
    shippingValue,
    totalPrice,
    totalQuantity,
  } = order;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };



 

  

  return (
    <div data-aos="fade-up" className={`my-6 rounded-lg md:max-w-6xl md:mx-auto mx-2 border ${order_status === 'Delivered' ? 'border-green-500' : 'border-orange-600' } `}>
      {/* Order Header */}
      <div className="dark:bg-gray-800 bg-gray-100 md:px-12  p-4 shadow-lg rounded-t-lg">
        <h1 className="text-xl font-bold mb-2">Order Details</h1>
        <p className="text-base">
          Order Date: {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className="text-lg text-gray-400">Order ID: {_id}</p>
        {order_status === "Pending" && (
          <p
            className={`text-xl font-semibold text-yellow-500
          }`}
          >
            Status: {order_status}
          </p>
        )}
        {(order_status === "Confirm" ||
          order_status === "Processing" ||
          order_status === "Delivered") && (
          <p
            className={`text-xl font-semibold text-green-500
          }`}
          >
            Status: {order_status}
          </p>
        )}
        {(order_status === "Cancel" || order_status === "Return") && (
          <p
            className={`text-xl font-semibold text-red-500
          }`}
          >
            Status: {order_status}
          </p>
        )}
      </div>

      {/* Products List */}
      <div className="bg-white dark:bg-gray-700 pb-6 p-3 md:px-12 shadow-lg ">
        <h2 className="text-lg font-bold mb-4">Ordered Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {carts?.map((product, index) => (
            <div key={index}>
              <ProductCard refetch={refetch} order_status={order_status} setIsModalOpen={setIsModalOpen} setSelectedProduct={setSelectedProduct} product={product} />
              
            </div>
          ))}
        </div>
      </div>

      {/* Review modal  */}
          {
            isModalOpen && <ReviewModal refetch={refetch} onClose={handleCloseModal} product={selectedProduct}/>
          }
      {/* Shipping Information */}
      <div className="dark:bg-gray-900 bg-gray-100 p-3 md:px-12 shadow-lg ">
        <h2 className="text-lg font-bold mb-4">Shipping Information</h2>
        <p className="text-sm">Name: {name}</p>
        <p className="text-sm">Email: {email}</p>
        <p className="text-sm">
          Shipping Address: {shippingAddress} {city} {country}
        </p>
        <p className="text-sm">
          Shipping Charge: {shippingValue} {currency}
        </p>
        <p className="text-sm">Phone: {phone}</p>
      </div>

      {/* Payment Information */}
      <div className="bg-white dark:bg-gray-700 p-3 md:px-12 shadow-lg ">
        <h2 className="text-lg font-bold mb-4">Payment Information</h2>
        <p className="text-sm capitalize">Payment Method: {paymentMethod}</p>
        <p className="text-sm">
          Card Issuer: {card_issuer} ({card_issuer_country})
        </p>
        <p className="text-sm">Transaction ID: {TxID}</p>
        <p className="text-sm">
          Paid: {paid} {currency}
        </p>
        <p className="text-sm">
          Due: {due} {currency}
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-100 dark:bg-gray-800 p-3 md:px-12 shadow-lg rounded-b-lg">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>
        <p className="text-sm uppercase">Coupon Code: {couponCode}</p>
        <p className="text-sm">Total Quantity: {totalQuantity}</p>
        <p className="text-sm">
          Total Price: {totalPrice} {currency}
        </p>
        <p className="text-sm">
          Discount: {discount} {currency}
        </p>
        <p className="text-sm">
          Final Amount: {finalAmount} {currency}
        </p>
        <p className="text-sm">
          Paid: {paid} {currency}
        </p>
        <p className="text-sm">
          Due: {due} {currency}
        </p>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
