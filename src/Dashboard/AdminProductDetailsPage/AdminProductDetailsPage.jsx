import { Link, useNavigate, useParams } from "react-router-dom";
import HomeAndBackButton from "../../Component/HomeAndBackButton/HomeAndBackButton";
import ImageGallery from "react-image-gallery";
import { Rating } from "@smastrom/react-rating";
import {
  confirmAlert,
  confirmationAlert,
  failedAlert,
} from "../../Component/SweetAlart/SweelAlart";
import { timeCoverterGMTtoLocal } from "../../utils/modules";
import useSingleProductReadForAdmin from "../../hooks/useSingleProductReadForAdmin";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import WaitingLoader from "../../Component/WaitingLoader/WaitingLoader";

const AdminProductDetailsPage = () => {
  const { id } = useParams();
  const { productDetails, loading } = useSingleProductReadForAdmin(id);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  if (loading) {
    return <WaitingLoader></WaitingLoader>;
  }

  const handleDelete = (_id) => {
    confirmationAlert({ detailsText: "Do you want to delete it ?" }).then(
      async (res) => {
        if (res.isConfirmed) {
          const res = await axiosSecure.delete(`/products/delete/${_id}`);
          if (res.data.deletedCount > 0) {
            confirmAlert("Delete Success !");
            navigate(-1);
          } else {
            failedAlert("Failed to Delete Product!");
          }
        }
      }
    );
  };

  const images = productDetails?.images?.map((image) => ({
    original: image.image_url,
    thumbnail: image.image_url,
  }));

  return (
    <div className="md:max-w-6xl mx-auto mt-3 ">
      <HomeAndBackButton></HomeAndBackButton>

      <div className="md:flex md:gap-4 gap-2  ">
        {/* for image  */}
        <div className="md:w-[35%] w-full relative">
          <ImageGallery
            items={images}
            showNav={false}
            showThumbnails={true}
            showFullscreenButton={false}
            showPlayButton={false}
            thumbnailPosition="bottom"
            slideOnThumbnailOver={true}
            renderItem={(item) => (
              <div className="w-full h-96 overflow-hidden">
                <img
                  src={item.original}
                  className="w-full h-full object-cover"
                  alt={item?.originalAlt}
                />
              </div>
            )}
            renderThumbInner={(item) => (
              <div className="w-full h-[80px] overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.thumbnailAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          />

          <div className="absolute rounded-full top-1 left-1 h-12 flex flex-col  w-12 bg-[#ff3811]  justify-center -space-y-[5px] items-center text-white p-1 text-sm">
            <span>{productDetails.discountAmount}tk</span>
            <span>save</span>
          </div>
          <div className="absolute top-3 right-0 md:px-3 px-2 text-lg rounded-tl-full rounded-br-full bg-[#ff3811] text-white">
            <span>{productDetails.discountPercent}%</span>
          </div>
        </div>

        {/* for others content or details  */}
        <div className=" md:[70%] w-full p-2 flex flex-col justify-between md:space-y-2 space-y-1 ">
          {/* product heading or headline or title  */}
          <div>
            <h2 className="md:text-3xl text-xl capitalize ">
              {productDetails?.productName?.toLowerCase()}
            </h2>
            <div className="flex gap-5 mt-2 font-semibold">
              <p className="">
                <span className="text-green-500">Stock : </span>
                {productDetails?.stockStatus &&
                productDetails?.stockQuantity ? (
                  <span className="text-green-500">Available</span>
                ) : (
                  <span className="text-[#ff3811]">Unavailable</span>
                )}
              </p>
              <p className="text-blue-400">
                Stock Quantiy : <span>{productDetails?.stockQuantity}</span>
              </p>
              <p className="text-yellow-500 capitalize">
                Category : {productDetails?.productCategory[1]}
              </p>
            </div>
          </div>

          {/* product price and ratings  */}
          <div className="  ">
            <p className="text-sm md:text-lg  text-[#ff3811]">
              Product Code :{" "}
              <span className="md:text-xl text-lg uppercase">
                {productDetails?.productCode}
              </span>{" "}
            </p>
            <p className="text-sm md:text-lg  text-[#ff3811]">
              Cost Price :{" "}
              <span className="md:text-xl text-lg">
                {productDetails?.costPrice}
              </span>{" "}
              Tk
            </p>
            <p className="text-sm md:text-lg  text-[#ff3811]">
              Sell Price :{" "}
              <span className="md:text-xl text-lg">
                {productDetails?.sellPrice}
              </span>{" "}
              Tk
            </p>

            <p className="text-sm md:text-lg  text-[#ff3811]">
              Discount Percent :{" "}
              <span className="md:text-xl text-lg">
                {productDetails?.discountPercent}
              </span>
              %
            </p>

            <p className="text-sm md:text-lg  text-[#ff3811]">
              Discount Amount :{" "}
              <span className="md:text-xl text-lg">
                {productDetails?.discountAmount}
              </span>{" "}
              Tk
            </p>

            <p className="text-sm md:text-lg  text-[#ff3811]">
              Final Price :{" "}
              <span className="md:text-xl text-lg">
                {productDetails?.finalPrice}
              </span>{" "}
              Tk
            </p>
            <p className="text-sm md:text-lg  text-[#ff3811]">
              Profit :{" "}
              <span className="md:text-xl text-lg">
                {productDetails?.profit}
              </span>{" "}
              Tk
            </p>

            <p className="text-sm md:text-lg  text-[#ff3811]">
              Publish Date :{" "}
              <span className="md:text-xl text-lg">
                {timeCoverterGMTtoLocal(productDetails?.createdAt)}
              </span>{" "}
              BD
            </p>
            <p className="text-sm md:text-lg  text-[#ff3811]">
              Last Edit :{" "}
              {productDetails.lastEdit ? (
                <span className="md:text-xl text-lg">
                  {timeCoverterGMTtoLocal(productDetails?.lastEdit)} BD
                </span>
              ) : (
                <span className="md:text-xl text-lg"> No Edit</span>
              )}
            </p>

            {productDetails?.totalRatingsCount > 0 && (
              <p className="flex items-center gap-1">
                <span className="text-sm md:text-lg">Ratings : </span>
                <span className="flex items-center text-xs md:text-lg">
                  <Rating
                    className="md:max-w-20 max-w-16 me-1"
                    value={productDetails?.averageRating}
                    readOnly
                  /> 
                  <span className="text-[12px] me-2 md:text-[15px]">
                    {productDetails?.averageRating}
                  </span>

                  <span className="text-[9px] md:text-[11px]">
                    ({productDetails?.totalRatingsCount})
                  </span>
                </span>
              </p>
            )}
          </div>

          {/* product details or description  */}
          <div className="flex-grow">
            <p className="text-justify">
              <span className="font-bold">Details : </span>
              {productDetails?.productDetails}
            </p>
            <div>
              <span className="text-xl">Tags : </span>{" "}
              {productDetails?.productTags?.map((tag, index) => (
                <p className="inline-block" key={index}>
                  {index + 1}. {tag}
                </p>
              ))}
            </div>
          </div>
          {/* product action button  */}
          <div className="space-y-3">
            <hr className="w-full" />

            <div className="flex gap-2 justify-evenly">
              <button
                onClick={() => handleDelete(productDetails._id)}
                className={`text-[#ff3811]  hover:bg-[#ff3811] hover:text-white w-1/2 md:py-2 py-1 bg-slate-100 `}
              >
                Delete it
              </button>

              <Link
                to={`/dashboard/update/${productDetails._id}`}
                className={`w-1/2 md:py-2 py-1 text-white bg-[#ff3811] text-center hover:bg-[#c6290a]`}
              >
                <button className=" ">Update it</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetailsPage;
