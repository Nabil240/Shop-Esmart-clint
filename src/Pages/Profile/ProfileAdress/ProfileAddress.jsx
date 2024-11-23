import { useEffect, useState } from "react";
import useUserInfo from "../../../hooks/useUserInfo";
import useDistrictsFetch from "../../../hooks/useDistrictsFetch";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { confirmAlert, failedAlert } from "../../../Component/SweetAlart/SweelAlart";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";

const ProfileAddress = () => {
  
  const districts = useDistrictsFetch();
  const {user, userUpdateProfile} = useAuth(); 
  
  const [usersInfo, isPending, refetch] = useUserInfo(); 
  const [loading, setLoading] = useState(false);
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
      return
    }
    if (usersInfo) {
      reset({
        name: usersInfo?.name || "",
        email: usersInfo?.email || "",
        phone: usersInfo?.phone || "",
        city: usersInfo?.city || "",
        country: usersInfo?.country || "Bangladesh",
        shippingAddress: usersInfo?.shippingAddress || "",
        
      });
    }
  }, [usersInfo, reset, isPending]);


  const onSubmit = async (data) => {
    const name = data.name;
    const phone = data.phone;
    const city = data.city;
    const country = data.country;
    const shippingAddress = data.shippingAddress;
    
    const userInfo = {
      name,
      phone,
      city,
      country,
      shippingAddress,
    };
    
    try {
      
      setLoading(true)
      const res = await axiosSecure.put(
        `/usersInfo?email=${user.email}`,
        userInfo
      );
      if (res.data.matchedCount > 0) {
        await userUpdateProfile(name);
        confirmAlert("Information Update Success!");

        refetch();
      }
      
    } catch (err) {
      if (err) {
        return failedAlert("Information Update Failed!");
      }
    }
    finally{
      setLoading(false)
    }
    
  };

  return (
    <div>
      {(isPending || loading) && <WaitingLoader></WaitingLoader>}
      <form onSubmit={handleSubmit(onSubmit)} className="md:p-4 p-2 space-y-4">
        <div className="grid grid-cols-3 items-center">
          <label className="col-span-1 text-lg font-semibold" htmlFor="name">
            Full Name
          </label>
          <input
            className="col-span-2 w-full border-b border-gray-400 py-1 px-2 outline-none rounded-sm"
            type="text"
            placeholder="Name"
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
        </div>
        <div className="grid grid-cols-3 items-center">
          <label className="col-span-1 text-lg font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="col-span-2 w-full border-b border-gray-400 py-1 px-2 outline-none rounded-sm text-gray-400 dark:text-gray-500"
            type="email"
            placeholder="Email"
            {...register("email")}
            readOnly
          />
        </div>
        <div className="grid grid-cols-3 items-center">
          <label className="col-span-1 text-lg font-semibold" htmlFor="phone">
            Phone
          </label>
          <input
            className="col-span-2 w-full border-b border-gray-400 py-1 px-2 outline-none rounded-sm"
            type="Number"
            placeholder="Phone"
            {...register("phone", {
              required: "Phone cannot be empty",
              minLength: { value: 11, message: "Phone At least 11 Digit" },
              pattern: {
                value: /^[0-9]{11,14}$/,
                message: "Please enter a valid Phone",
              },
            })}
          />
        </div>
        <div className="grid md:grid-cols-6 grid-cols-3 gap-4  items-center">
          <label className="col-span-1 text-lg font-semibold" htmlFor="name">
            City
          </label>
          <select
             {...register("city", {
              required: true,
            })}
            className="col-span-2 w-full border-b border-gray-400 py-1 px-2 outline-none rounded-sm"
          >
            <option value={""}>Select Your City</option>
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
          <label className="col-span-1 text-lg font-semibold" htmlFor="name">
            Country
          </label>
          <select
            name="country"
            className="col-span-2 w-full border-b border-gray-400 py-1 px-2 outline-none rounded-sm"
            id=""
            {...register("country", {
              required: true,
            })}
          >
            {usersInfo?.country ? (
                <option value={usersInfo.country}>{usersInfo.country}</option>
              ) : (
                <option value="Bangladesh">Bangladesh</option>
              )}
          </select>
        </div>
        <div className="grid grid-cols-3 items-center">
          <label className="col-span-1 text-lg font-semibold" htmlFor="name">
            Address
          </label>

          <textarea
            rows={1}
            className="col-span-2 w-full border-b border-gray-400 py-1 px-2 outline-none rounded-sm"
            placeholder="House No #, Road #, Thana #, Upazila #"
            {...register("shippingAddress", {
              required: true,
            })}
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button disabled={loading || isPending} className="text-white bg-[#ff3811] hover:bg-orange-800 py-1 w-2/5">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileAddress;
