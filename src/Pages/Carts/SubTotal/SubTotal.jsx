import { useEffect, useRef, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { IoMdReturnRight } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useCarts from "../../../hooks/useCarts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const SubTotal = ({ reset, setReset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Add Shipping Charge");
  const [shippingValue, setShippingValue] = useState(0);
  const { carts, totalQuantity, totalPrice , refetch } = useCarts();
  const [couponsValue, setCouponsValue] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [vatTax, setVatTax] = useState(0);
  const [finalTotalAmount, setFinalTotalAmount] = useState(
    totalPrice + shippingValue
  );
  const axiosSecure = useAxiosSecure();
  const [couponSubmit, setCouponSubmit] = useState(false);
  const [couponErrorMessage, setCouponErrorMessage] = useState("");

  const notify = () =>
    toast.error(couponErrorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const navigate = useNavigate();
  const couponRef = useRef(null);

  const dropDownRef = useRef(null);

  const options = [
    { value: 70, name: "insideDhaka", label: "Inside Dhaka 70 tk" },
    { value: 150, name: "outsideDhaka", label: "Outside Dhaka 150 tk" },
    { value: 0, name: "officeDelivery", label: "Office Delivery" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    //cleanup func
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef, isOpen]);

  const handleOptionSelect = (option) => {
    setSelected(option.label);
    setIsOpen(false);
    setShippingValue(option.value);
    setCouponsValue(0);
    setCouponCode("");
    if (couponRef.current) {
      couponRef.current.value = "";
    }
    setFinalTotalAmount(totalPrice + option.value);
    // console.log({ target: { value: option.value } });
  };

  const handleCouponSubmit = async (e) => {
    e.preventDefault();

    if (!(selected === "Office Delivery") && !shippingValue) {
      return toast.warn("Add Your Shipping Charge!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    const couponCode = e.target.coupon.value.toLowerCase();
    if (!couponCode) {
      return toast.warn("Please Enter Valid Coupon Code", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

  

    try {
      setCouponSubmit(true);
      const res = await axiosSecure.post(`/coupons-apply`, {
        couponCode,
        totalPrice,
        shippingValue,
      });

      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setCouponCode(couponCode);
        setCouponsValue(res.data.discountAmount);
        setFinalTotalAmount(res.data.finalAmount);
      }
    } catch (err) {
      console.error(err)
      setCouponErrorMessage(err.response.data.message);
     
       
      
    } finally {
      setCouponSubmit(false);
    }
  };

  const handleCheckout = () => {
    const orderData = {
      carts,
      totalQuantity,
      totalPrice,
      shippingValue,
      shippigMethod: selected,
      discount: couponsValue,
      finalAmount: finalTotalAmount,
      couponCode: couponCode,
      vatTax,
    };

    navigate("/checkout", { state: { orderData } });
  };

  useEffect(() => {
    if(couponErrorMessage){
      notify();
      setCouponErrorMessage('')
    }
    if (reset) {
      setCouponsValue(0);
       
      setReset(false);
    }
    if (!totalQuantity) {
      setShippingValue(0);
    }
    if(totalPrice){
      setFinalTotalAmount(totalPrice + shippingValue)
    }
  }, [reset, setReset, totalQuantity, totalPrice, couponErrorMessage]);

  return (
    <div className="md:w-[25%] mt-3 md:mt-0 w-full flex flex-col h-full space-y-3 bg-gray-200 dark:bg-gray-700 p-4 md:p-6">
      <h2 className="text-xl md:text-2xl">Summery</h2>
      <div className="space-y-3 flex-grow">
        {/* Deliver Charge Include  */}
        <div ref={dropDownRef} className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left py-1 ps-3 pe-8 text-sm md:text-lg  border border-black dark:border-white  rounded-sm outline-none"
          >
            {selected}
          </button>
          <span className="absolute md:text-2xl pointer-events-none right-1 md:inset-y-2 text-[#ff3811] inset-y-[5px]">
            {isOpen ? <FaCaretUp /> : <FaCaretDown />}
          </span>

          {isOpen && (
            <div
              data-aos="zoom-out"
              data-aos-duration="800"
              className="absolute z-20 bg-gray-100 text-black w-full rounded-b-sm "
            >
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className=" hover:text-white w-full text-left hover:bg-[#ff3811] text-sm md:text-lg  md:ps-3 py-1 ps-3"
                >
                  {" "}
                  {option.label}{" "}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* apply Cuppon  */}
        <div>
          <form className="relative pb-2" onSubmit={handleCouponSubmit}>
            <label className="" htmlFor="coupon">
              Apply Coupon
            </label>
            <input
              ref={couponRef}
              type="text"
              name="coupon"
              className="w-full mt-2 px-2 py-1 uppercase outline-none rounded-sm"
              placeholder="Coupon Code Type here"
            />
            {couponSubmit ? (
              <span className="loading loading-spinner absolute text-2xl right-1 font-bold z-10 top-9 text-[#ff3811]"></span>
            ) : (
              <button className="absolute text-2xl right-1 font-bold z-10 top-9 text-[#ff3811]">
                <IoMdReturnRight />{" "}
              </button>
            )}
          </form>
        </div>

        {/* sub total  */}
        <div className="flex-grow">
          <div className="divider"></div>
          <div className="flex justify-between items-center">
            <span>Items</span>
            <span>{totalQuantity} pcs</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Shipping</span>
            <span>{shippingValue} tk</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Discout</span>
            <span>{couponsValue} tk</span>
          </div>
          <div className="flex justify-between items-center">
            <span>VAT+Tax</span>
            <span>{vatTax} tk</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Total Amount</span>
            <span>{totalPrice} tk</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Sub Total</span>
            <span>{finalTotalAmount} tk</span>
          </div>
        </div>

        {/* checkout button  */}
        <div className="">
          <div className="divider"></div>

          {selected === "Add Shipping Charge" ? (
            <button
              disabled
              className="btn-block bg-gray-400 py-1 text-center text-white disabled outline-none"
            >
              Check Out
            </button>
          ) : (
            <button
              onClick={handleCheckout}
              className="btn-block bg-[#ff3811] py-1 text-center text-white hover:bg-red-600 outline-none"
            >
              Check Out
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SubTotal;
