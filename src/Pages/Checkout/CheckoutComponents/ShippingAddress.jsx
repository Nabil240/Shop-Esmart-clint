import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useUserInfo from "../../../hooks/useUserInfo";
import useDistrictsFetch from "../../../hooks/useDistrictsFetch";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  confirmAlert,
  failedAlert,
} from "../../../Component/SweetAlart/SweelAlart";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";

const ShippingAddress = ({ setShippingInfo }) => {
  const districts = useDistrictsFetch();
  const [usersInfo, isPending, refetch] = useUserInfo();
  const { user, userUpdateProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      country: "Bangladesh",
      shippingAddress: "",
      note: "",
    },
  });

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (usersInfo) {
      reset({
        name: usersInfo?.name || "",
        email: usersInfo?.email || "",
        phone: usersInfo?.phone || "",
        city: usersInfo?.city || "",
        country: usersInfo?.country || "Bangladesh",
        shippingAddress: usersInfo?.shippingAddress || "",
        note: "",
      });
    }
  }, [usersInfo, reset, isPending]);

  const onSubmit = async (data) => {
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const city = data.city;
    const country = data.country;
    const shippingAddress = data.shippingAddress;
    const note = data.note;

    const userInfo = {
      name,
      phone,
      city,
      country,
      shippingAddress,
    };

    try {
      const res = await axiosSecure.put(`/usersInfo`, userInfo);
      if (res.data.matchedCount > 0) {
        await userUpdateProfile(name);
        confirmAlert("Shipping Info Added Success!");

        refetch();
      }
    } catch (err) {
      if (err) {
        return failedAlert("Shipping Info Added Failed");
      }
    }

    const shippingInformation = {
      name,
      email,
      phone,
      city,
      country,
      shippingAddress,
      note,
    };

    setShippingInfo(shippingInformation);
  };

  return (
    <div className="bg-gray-200  dark:bg-gray-700">
      <h2 className="md:text-2xl text-lg px-2">Shipping Address</h2>
      {isPending && <WaitingLoader></WaitingLoader>}
      <div className="md:p-4 p-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 ">
          <div className="relative space-y-2">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full py-1 px-2 outline-none rounded-sm border"
              {...register("name", {
                required: "Name cannot be empty",
                minLength: {
                  value: 3,
                  message: "Name At least 3 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/i,
                  message: "Use letters & spaces only",
                },
              })}
            />
            {errors.name && (
              <span
                className="tooltip tooltip-open tooltip-right tooltip-error absolute  left-[52px] top-1"
                data-tip={errors.name.message}
              ></span>
            )}
          </div>
          <div className="relative space-y-2">
            <label htmlFor="email">Email*</label>
            <input
              readOnly
              type="email"
              name="email"
              placeholder="Email"
              className="w-full py-1 px-2 outline-none rounded-sm border"
              {...register("email")}
            />
          </div>
          <div className="relative space-y-2">
            <label htmlFor="phone">Phone*</label>
            <input
              pattern="[0-9]{10,14}"
              min={0}
              type="number"
              name="phone"
              placeholder="Phone number"
              className="w-full py-1 px-2 outline-none rounded-sm border"
              {...register("phone", {
                required: "Phone cannot be empty",
                minLength: { value: 11, message: "Phone At least 11 Digit" },
                pattern: {
                  value: /^[0-9]{11,14}$/,
                  message: "Please enter a valid Phone",
                },
              })}
            />
            {errors.phone && (
              <span
                className="tooltip tooltip-open tooltip-right tooltip-error absolute left-14 top-1"
                data-tip={errors.phone.message}
              ></span>
            )}
          </div>

          <div className="relative space-y-2">
            <label htmlFor="city">City*</label>
            <select
              {...register("city", {
                required: true,
              })}
              name="city"
              className="w-full border py-1 px-2 outline-none rounded-sm"
            >
              <option value="">Select Your City</option>
              {usersInfo?.city && (
                <option value={usersInfo?.city}>{usersInfo?.city}</option>
              )}
              {districts.map((district, index) => (
                <option value={district.district} key={index}>
                  {" "}
                  {district.district}
                </option>
              ))}
            </select>
            {errors.city && (
              <span
                className="tooltip tooltip-open tooltip-right tooltip-error absolute left-10 top-1"
                data-tip={"City cannot be empty"}
              ></span>
            )}
          </div>
          <div className="relative space-y-2">
            <label htmlFor="country">Country*</label>
            <select
              {...register("country", {
                required: true,
              })}
              name="country"
              className="w-full border py-1 px-2 outline-none rounded-sm"
            >
              {usersInfo?.country ? (
                <option value={usersInfo.country}>{usersInfo.country}</option>
              ) : (
                <option value="Bangladesh">Bangladesh</option>
              )}
            </select>
            {errors.country && (
              <span
                className="tooltip tooltip-open tooltip-right tooltip-error absolute left-14  top-1"
                data-tip={"Country cannot be empty"}
              ></span>
            )}
          </div>
          <div className="relative space-y-2">
            <label htmlFor="shippingAddress">Shipping Address*</label>
            <textarea
              rows={4}
              name="shippingAddress"
              className="w-full border outline-none px-2 py-1"
              placeholder="House No #, Road #, Thana #, Upazila #"
              {...register("shippingAddress", {
                required: true,
              })}
            ></textarea>
            {errors.shippingAddress && (
              <span
                className="tooltip tooltip-open tooltip-right tooltip-error absolute left-[135px] top-1"
                data-tip={"Cannot be empty"}
              ></span>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="note">
              Additional Note{" "}
              <span className="text-gray-400 dark:text-gray-500">optional</span>
            </label>
            <textarea
              {...register("note")}
              rows={2}
              name="note"
              className="w-full border outline-none px-2 py-1"
              placeholder="Additional Note"
            ></textarea>
          </div>
          <div className="">
            <button className="w-full bg-[#ff3811] py-2 text-white hover:bg-red-700">
              Confirm Shipping Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingAddress;
