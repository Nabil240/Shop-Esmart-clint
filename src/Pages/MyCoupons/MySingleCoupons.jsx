import {
  FaCheckCircle,
  FaTimesCircle,
  FaPercentage,
  FaInfoCircle,
  FaTag,
} from "react-icons/fa";

const MySingleCoupons = ({ coupon }) => {
  const {
    _id,
    coupon_code,
    coupon_type,
    description,
    discount_value,
    max_discount,
    min_purchase_amount,
    usage,
    end_date,
  } = coupon;

  const endDate = new Date(end_date);
  const currentDate = new Date();
  const isValid = currentDate < endDate;

  return (
    <div data-aos="fade-up"  className="">
      {/* Coupon Card */}
      <div
        className={`border ${
          isValid ? "border-green-500" : "border-red-500 "
        } rounded-lg overflow-hidden shadow-lg transition transform md:hover:scale-110 hover:scale-105 hover:shadow-xl relative`}
      >
        <div
          className={`md:grid  md:grid-cols-3 flex flex-col md:p-6 pt-6 p-3`}
        >
          <div className="absolute md:text-lg text-sm  top-0 left-0  bg-yellow-400 text-white px-3 py-1 rounded-tr-lg rounded-bl-lg font-semibold">
            <FaTag className="inline-block mr-1" />{" "}
            {isValid ? "VALID" : "EXPIRED"}
          </div>
          {/* Coupon Code & Status */}
          <div className="flex  flex-col justify-center items-center">
            <h3
              className={`md:text-2xl text-xl font-bold uppercase ${
                isValid ? "text-green-600" : "text-red-500"
              }`}
            >
              {coupon_code}
            </h3>
            {isValid ? (
              <FaCheckCircle className="text-green-600 md:text-3xl text-2xl mt-2" />
            ) : (
              <FaTimesCircle className="text-red-500 md:text-3xl text-2xl mt-2" />
            )}
          </div>

          {/* Coupon Details */}
          <div className="col-span-2 flex flex-col justify-center md:pl-4">
            {description && <p className="text-sm capitalize text-gray-500 flex items-center">
              <FaInfoCircle className="inline mr-2" /> {description}
            </p>}

            {/* Coupon Discount Type */}
            <p className="text-lg mt-2 font-semibold flex items-center">
              {coupon_type === "percentage" ? (
                <>
                  <FaPercentage className="text-green-500 mr-2" />
                  {discount_value}% OFF
                </>
              ) : (
                <>
                  <span className="text-blue-500 mr-2">৳</span>
                  {discount_value} OFF
                </>
              )}
            </p>

            {/* Additional Coupon Info */}
            <p className="text-sm text-gray-500 mt-1">
              Max Discount:{" "}
              {coupon_type === "percentage" ? (
                <span className="font-semibold">৳{max_discount ? max_discount : 'Unlimited'}</span>
              ) : (
                <span className="font-semibold">
                  ৳{max_discount ? max_discount : discount_value}
                </span>
              )}{" "}
              | Min Purchase:{" "}
              <span className="font-semibold">৳{min_purchase_amount}</span>
            </p>

            {/* Usage Limit */}
            <p className="text-sm text-gray-500 mt-1">
              Usage Limit:{" "}
              <span className="font-semibold">
                {usage.limit === 0 ? "Unlimited" : `${usage.limit} times`}
              </span>
            </p>

            {/* Expiry Date */}
            <p className="text-xs text-gray-400 mt-1">
              Expires on: {endDate.toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Expired Section */}
        {!isValid && (
          <div className="bg-red-100 text-red-500 text-center py-2">
            <p>This coupon has expired.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySingleCoupons;
// <div className="">
//   {isValid ? (
//     <div className="grid grid-cols-3 border border-dashed md:p-4 p-2 h-32 justify-center items-center">

//         <div>
//                 <h3 className={`md:text-2xl text-lg font-bold uppercase ${isValid ? 'text-green-600' : 'text-red-500'}`}>{coupon_code}</h3>

//         </div>

//         <div className="col-span-2">

//         </div>
//     </div>
//   ) : (
//     <div>

//     </div>
//   )}
// </div>
