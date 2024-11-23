import { useState } from "react";
import ReactFIleInput from "../../../Component/ReactFileInput/ReactFIleInput";
import { upoloadImageToCloudinary } from "../../../Component/CloudinaryImageHost/CloudinaryImageHost";
import { failedAlert } from "../../../Component/SweetAlart/SweelAlart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { confirmAlert } from "./../../../Component/SweetAlart/SweelAlart";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";

const BannerUpload = () => {
  const [bannerImage, setBannerImage] = useState([]);
  const [formReset, setFormReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleUploadBanner = async () => {
    setFormReset(false);
    setLoading(true);
    const uploadedImageUrls = await Promise.all(
      bannerImage.map(async (imageFile) => {
        const res = await upoloadImageToCloudinary(imageFile);
        if (res) {
          return { image_id: res.public_id, image_url: res.secure_url };
        }

        return null;
      })
    );

    if (!uploadedImageUrls.every((image) => image)) {
      failedAlert("Image upload failed. Please try again.");
      setLoading(false);
      return;
    }
    try {
      const res = await axiosSecure.post(
        "/site-settings/banners",
        uploadedImageUrls
      );
      if (res.data.insertedId) {
        confirmAlert("Banner Added Success!");
        setFormReset(true);
      }
    } catch (err) {
      failedAlert("Failed to Add new Banner!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div>
          <WaitingLoader></WaitingLoader> Please Wait...
        </div>
      )}
      <ReactFIleInput
        setProductImages={setBannerImage}
        setFormReset={setFormReset}
        
        formReset={formReset}
      ></ReactFIleInput>
      <div className="w-1/2 mx-auto mt-4">
        {bannerImage.length && !loading ? (
          <button
            onClick={handleUploadBanner}
            className="w-full bg-[#ff3811] rounded-sm hover:bg-[#b92204] text-white py-2 text-center"
          >
            Upload Banner
          </button>
        ) : (
          <button
            disabled
            className="w-full py-2 text-center text-white bg-gray-300 rounded-sm disabled"
          >
            Upload Banner
          </button>
        )}
      </div>
    </div>
  );
};

export default BannerUpload;
