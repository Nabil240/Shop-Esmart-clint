import { Link } from "react-router-dom";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import HomeAndBackButton from "../../Component/HomeAndBackButton/HomeAndBackButton";
import { RxCross2 } from "react-icons/rx";
import SubTotal from "./SubTotal/SubTotal";
import useCarts from "../../hooks/useCarts";
import {
  confirmAlert,
  confirmationAlert,
} from "../../Component/SweetAlart/SweelAlart";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import WaitingLoader from "../../Component/WaitingLoader/WaitingLoader";
import { useState } from "react";
import EmptyPage from "../../Component/EmptyPage/EmptyPage";

const Carts = () => {
  const axiosSecure = useAxiosSecure();

  const {carts, isPending, refetch} = useCarts();
  const [reset, setReset] = useState(false); 


  const handleQuantityChange = async (_id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await axiosSecure.patch(`/carts/${_id}`, {
        quantity: newQuantity,
      });

      if (res.data.modifiedCount > 0) {
        refetch();
        setReset(true); 
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleItemDelete = async (_id) => {
    confirmationAlert({}).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/carts/${_id}`);
        if (res.data.deletedCount) {
          confirmAlert("Deleted Success !");
          setReset(true);
          refetch();
        }
      }
    });
  };

  return (
    <div className="mx-auto mt-3 md:max-w-6xl">
      <HomeAndBackButton></HomeAndBackButton>

      {isPending && <WaitingLoader></WaitingLoader>}

      {carts?.length > 0 ?

      <div className="gap-3 md:flex ">
        {/* carts table  */}
        <div className="overflow-x-auto md:w-3/4 ">
          <table className="table">
            <thead className="text-base md:text-2xl">
              <tr>
                <th className="!p-1">Item</th>
                <th className="!p-1">Price</th>
                <th className="!p-1">Qauntity</th>
                <th className="!p-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {carts?.map((cart) => (
                <tr data-aos="fade-up" className="relative hover " key={cart._id}>
                  <td className="!p-1 md:!w-1/2  ">
                    <Link to={`/product/${cart.product_id}`}>
                      <div className="flex items-center gap-1 md:gap-3">
                        <div className="flex-shrink-0 w-16 h-16 overflow-hidden md:w-32 md:h-32">
                          <img
                            className="object-cover w-full h-full"
                            src={cart?.productIamge}
                          />{" "}
                        </div>
                        <div className="text-[10px]  md:text-lg capitalize">
                          <p className="bottom-0 text-wrap ">
                            {cart?.productName.length > 40
                              ? `${cart?.productName
                                  .slice(0, 40)
                                  .toLowerCase()}...`
                              : cart?.productName.toLowerCase()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className=" text-nowrap md:text-lg !p-1">
                    {cart?.productPrice} Tk
                  </td>
                  <td className="!p-1">
                    <div className="flex items-center space-x-3">
                      <button
                        disabled={cart?.quantity === 1}
                        onClick={() => {
                          handleQuantityChange(cart._id, cart.quantity - 1);
                        }}
                        className={`${
                          cart?.quantity === 1
                            ? "btn-disabled text-gray-300"
                            : "text-[#ff3811]  hover:text-[#c6290a]"
                        }  rounded-full text-lg md:text-2xl`}
                      >
                        <FaMinusCircle></FaMinusCircle>
                      </button>
                      <span className="w-4 text-base text-center md:w-6 md:text-lg">
                        {cart?.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(cart._id, cart.quantity + 1)
                        }
                        className={`
                     text-[#ff3811] hover:text-[#c6290a] 
                     rounded-full  text-lg md:text-2xl`}
                      >
                        <FaPlusCircle></FaPlusCircle>
                      </button>
                    </div>
                  </td>
                  <td className="!p-1">
                    {" "}
                    <div>
                      <p className="text-sm text-nowrap md:text-lg">
                        {cart.quantity * cart.productPrice} Tk
                      </p>{" "}
                      <button
                        onClick={() => handleItemDelete(cart._id)}
                        className="absolute top-1 right-1 text-xl rounded-full md:text-3xl text-[#ff3811] hover:text-[#929090]"
                      >
                        <RxCross2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
       {carts.length > 0 && <SubTotal reset={reset} setReset={setReset}></SubTotal>}
      </div> :  <EmptyPage></EmptyPage> }
    </div>
  );
};

export default Carts;
