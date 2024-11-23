import { FaLocationDot } from "react-icons/fa6";
import { GiRotaryPhone } from "react-icons/gi";
import { MdWatchLater } from "react-icons/md";
import { PiMapPinAreaFill } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";

const DeliveryInfo = () => {
  return (
    <div className=" px-2 md:w-1/5 w-full space-y-3">
      <h2 className="flex items-end gap-2 text-xl">
        <TbTruckDelivery className="text-2xl" /> Delivery info
      </h2>

      <div className="space-y-3 text-justify text-sm">
        <p className="">
          {" "}
          <span className="flex items-center gap-2">
            {" "}
            <span className="text-xl">
              <PiMapPinAreaFill />
            </span>{" "}
            Inside Dhaka :{" "}
          </span>{" "}
          <span>Delivery Charge 70tk & Delivery Time 12 to 36 hours. </span>
        </p>

        <p className="">
          {" "}
          <span className="flex items-center gap-2">
            {" "}
            <span className="text-xl">
              <PiMapPinAreaFill />
            </span>{" "}
            Outside Dhaka :{" "}
          </span>{" "}
          <span>Delivery Charge 150tk & Delivery Time 24 to 72 hours. </span>
        </p>

        <p className="">
          {" "}
          <span className="flex items-center gap-2">
            {" "}
            <span className="text-xl">
              <MdWatchLater />
            </span>{" "}
            Office Delivery :{" "}
          </span>{" "}
          <span>Friday to Saturday, 10.00am to 11.00pm. </span>
        </p>

        <p className="">
          {" "}
          <span className="flex items-center gap-2">
            {" "}
            <span className="text-xl">
            <FaLocationDot />
            </span>{" "}
            Shop Location :{" "}
          </span>{" "}
          <span>Mirpur 10, Shah Ali Plaza, Level-7, Lift-6, Shop-792 Shop Esmart  </span>
        </p>
        <p className="text-nowrap">
          {" "}
          <span className="flex items-center gap-2">
            {" "}
            <span className="text-xl">
            <GiRotaryPhone />
            </span>{" "}
            Hot Line :{" "}
          </span>{" "}
          <span>09696325199 | 01580325199 </span>
        </p>
      </div>
    </div>
  );
};

export default DeliveryInfo;
