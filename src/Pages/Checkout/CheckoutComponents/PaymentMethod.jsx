import { useState } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { GiBanknote } from "react-icons/gi";
import useSSLcommerz from "../../../hooks/useSSLcommerz";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  confirmAlert,
  failedAlert,
} from "../../../Component/SweetAlart/SweelAlart";
import { useNavigate } from "react-router-dom";
import useCarts from "../../../hooks/useCarts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentMethod = ({ orderData, shippingInfo }) => {
  const navivate = useNavigate();

  const [payment, setPayment] = useState("");
  const [loading, setLoading] = useState(false);
  const { sslCommerzPayment } = useSSLcommerz({ setLoading });
  const axiosSecure = useAxiosSecure();
  const { refetch } = useCarts();

  const isCashNowPay = orderData.shippingValue;
  const isCashDue = orderData.finalAmount - isCashNowPay;

  const isFullPayNow = orderData.finalAmount;
  const isFullPayDue = orderData.finalAmount - isFullPayNow;

  // const isCardNowPay = orderData.finalAmount;
  // const isCardDue = orderData.finalAmount - isCardNowPay;

  // const isMobileNowPay = orderData.finalAmount;
  // const isMobileDue = orderData.finalAmount - isMobileNowPay;

  const notify = () => toast("⚠ Please Confirm Your Shipping Info");

  const handlePaymentMethod = (e) => {
    setPayment(e.target.value);
  };
  // console.log(payment);

  const handleOrderPlace = async () => {
    if (Object.keys(shippingInfo).length === 0) {
      return notify();
    }
    if (payment === "cash") {
      const newOrder = {
        ...orderData,
        ...shippingInfo,
        paid: isCashNowPay,
        due: isCashDue,
        paymentMethod: 'Cash On Delivery',
      };

      try {
        setLoading(true);
        if (
          orderData.shippingValue === 0 &&
          orderData.shippigMethod === "Office Delivery"
        ) {
          const res = await axiosSecure.post(`/orders`, newOrder);
          if (res.data.success) {
            const orderId = res.data.insertedId.slice(-12);
            confirmAlert("Order Submited!");

            refetch();
            navivate(
              `/order-submited?status="Your Order has been Submited"&order_id=${orderId}`,
              { replace : true, state: { orderData: null } }
            );
          }
        } else {
          sslCommerzPayment(newOrder);
        }
      } catch (err) {
        failedAlert("Place Order Failed!");
      } finally {
        setLoading(false);
      }
    } else if (payment === "full") {
      const newOrder = {
        ...orderData,
        ...shippingInfo,
        paid: isFullPayNow,
        due: isFullPayDue,
        paymentMethod: 'Full Paid',
      };

      sslCommerzPayment(newOrder);
    }

    // TODO : Develop Card Payment via Stripe , and Bkash Payment Develop

    // else if(payment === 'card'){

    //   const newOrder = { ...orderData, ...shippingInfo, paid : isCardNowPay, due : isCardDue, paymentMethod : payment };

    // }

    // else if(payment === 'mobileBanking'){

    //   const newOrder = { ...orderData, ...shippingInfo, paid : isMobileNowPay, due : isMobileDue, paymentMethod : payment };
    // }
  };
  return (
    <div className="px-2 md:px-0">
      {loading && <WaitingLoader></WaitingLoader>}
      <h2 className="md:text-2xl text-lg mb-3">Payment Method</h2>
      <div>
        <form
          onChange={handlePaymentMethod}
          className="md:flex justify-around"
        >
          {/* <div className="flex items-center gap-2">
            <input
              type="radio"
              className="radio-sm"
              name="payment"
              value={"card"}
              id=""
            />{" "}
            <span className="text-2xl">
              <FaRegCreditCard />
            </span>
            <span>Card</span>
          </div> */}
          <div className="flex items-center gap-2">
            <input
              type="radio"
              className="radio-sm"
              name="payment"
              value={"full"}
              id=""
            />{" "}
            <span className="text-2xl">
              <FaRegCreditCard />
            </span>
            <span>Full Pay</span>
          </div>
          {/* <div className="flex items-center gap-2">
            <input
              type="radio"
              className="radio-sm"
              name="payment"
              value={"mobileBanking"}
              id=""
            />{" "}
            <span className="text-2xl">
              <AiFillBank />
            </span>
            <span className="text-nowrap">Mobile Banking</span>
          </div> */}
          <div className="flex items-center gap-2">
            <input
              type="radio"
              className="radio-sm"
              name="payment"
              value={"cash"}
              id=""
            />{" "}
            <span className="text-2xl">
              <GiBanknote />
            </span>
            <span className="text-nowrap">Cash</span>
          </div>
        </form>
      </div>
      <div>
        <div className="divider"></div>
        {payment === "cash" && (
          <div className="text-xl">
            <div className="flex justify-between items-center">
              <span>Shipping Charge Pay Now</span>
              <span>{isCashNowPay} tk</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Due Amount</span>
              <span>{isCashDue} tk</span>
            </div>
          </div>
        )}
        {payment === "full" && (
          <div className="text-xl">
            <div className="flex justify-between items-center">
              <span>Total Pay Now</span>
              <span>{isFullPayNow} tk</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Due Amount</span>
              <span>{isFullPayDue} tk</span>
            </div>
          </div>
        )}
        {/* {payment === "card" && (
          <div className="text-xl">
            <div className="flex justify-between items-center">
              <span>Total Pay Now</span>
              <span>{isCardNowPay} tk</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Due Amount</span>
              <span>{isCardDue} tk</span>
            </div>
          </div>
        )}
        {payment === "mobileBanking" && (
          <div className="text-xl">
            <div className="flex justify-between items-center">
              <span>Total Pay Now</span>
              <span>{isMobileNowPay} tk</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Due Amount</span>
              <span>{isMobileDue} tk</span>
            </div>
          </div>
        )} */}
        <div className="divider"></div>
      </div>

      <div>
        {payment ? (
          <button
            onClick={handleOrderPlace}
            className="btn-block bg-[#ff3811] hover:bg-red-800 text-white py-2"
          >
            Place Order
          </button>
        ) : (
          <button
            disabled
            className="btn-block bg-gray-300 btn-disabled text-white py-2"
          >
            Place Order
          </button>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default PaymentMethod;
