

const ReviewOrder = ({ orderData }) => {
  const {
    carts,
    shippingValue,
    totalPrice,
    totalQuantity,
    finalAmount,
    discount,
    vatTax,
  } = orderData;
  
  return (
    <div className="px-2 md:px-0">
      <h2 className="md:text-2xl text-lg mb-2">Review Your Order</h2>

      <div>
        {carts?.map((item) => (
          <div key={item._id} className="flex items-center  gap-2 mb-2">
            <div className="w-14 h-14 md:w-20 md:h-20 flex-shrink-0 overflow-hidden">
              <img
                className="w-full h-full ovject-cover "
                src={item.productIamge}
                alt=""
              />
            </div>
            <div className="text-left flex-grow ">
              <p>
                {item.productName.length > 20
                  ? `${item.productName.slice(0, 19)}...`
                  : item.productName}
              </p>
              <p>Quantity : {item.quantity}</p>
            </div>
            <div>
              <p className="text-nowrap">{item.productPrice} Tk</p>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4">
          <span>Total Price</span>
          <span>{totalPrice} tk</span>
        </div>
        <div className="">
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
            <span>{discount} tk</span>
          </div>
          <div className="flex justify-between items-center">
            <span>VAT+Tax</span>
            <span>{vatTax} tk</span>
          </div>
          <div className="flex justify-between items-center text-xl">
            <span>Sub Total</span>
            <span>{finalAmount} tk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
