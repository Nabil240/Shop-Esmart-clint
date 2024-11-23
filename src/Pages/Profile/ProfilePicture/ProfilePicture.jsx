import { useRef, useState } from "react";
import useUserInfo from "../../../hooks/useUserInfo";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";
import {
  confirmAlert,
  failedAlert,
} from "../../../Component/SweetAlart/SweelAlart";
import { upoloadImageToCloudinary } from "../../../Component/CloudinaryImageHost/CloudinaryImageHost";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ProfilePicture = () => {
  const fileInputRef = useRef();
  const { user, userUpdateProfile } = useAuth();
  const [usersInfo, isPending, refetch] = useUserInfo();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleImageInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        if (usersInfo.imageUrl && usersInfo.imageId) {
          await userUpdateProfile(user.name, " ");
          await axiosSecure.post(`/delete-image`, {
            public_id: usersInfo.imageId,
          });
        }
        const uploadedProfile = await upoloadImageToCloudinary(file);
        if (uploadedProfile) {
          const imageUrl = uploadedProfile.secure_url;
          const imageId = uploadedProfile.public_id;
          const userInfo = { imageUrl, imageId };

          await userUpdateProfile(user.name, imageUrl);
          const res = await axiosSecure.put(`/usersInfo`, userInfo);
          if (res.data.matchedCount > 0) {
            confirmAlert("Profile Update Success!");
            refetch();
          }
        }
      } catch (err) {
        failedAlert("Profile Upload Failed!");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-center w-full gap-3 bg-gray-100 dark:bg-gray-700 h-96">
      {(isPending || loading) && <WaitingLoader></WaitingLoader>}
      <div className="h-24 w-full bg-gray-300 dark:bg-gray-500 absolute top-0 rounded-b-[100%]"></div>
      <div className="z-10 w-44">
        <img
          className="object-cover rounded-full w-44 h-44"
          src={
            usersInfo?.imageUrl
              ? usersInfo.imageUrl
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"
          }
        />
      </div>
      <div className="flex flex-col items-center gap-1 w-[90%]">
        <h2 className="w-full text-2xl font-bold text-center">
          {usersInfo?.name ? usersInfo.name : "Your Name"}
        </h2>
        <p>Profile ID : #{usersInfo?._id?.slice(-8)}</p>
        <button
          disabled={isPending || loading}
          onClick={handleImageInput}
          className="text-white py-1 px-5 w-[70%] outline-none rounded-sm  bg-[#ff3811] hover:bg-red-800"
        >
          Change Image
        </button>

        {/* hide file input  */}
        <input
          type="file"
          accept="image"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  );
};

export default ProfilePicture;
