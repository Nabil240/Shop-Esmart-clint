import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { Rating } from "@smastrom/react-rating";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import DeliveryInfo from "./DeliveryInfo/DeliveryInfo";
import HomeAndBackButton from "../../Component/HomeAndBackButton/HomeAndBackButton";
import WaitingLoader from "../../Component/WaitingLoader/WaitingLoader";
import useAuth from "./../../hooks/useAuth";
import { confirmationAlert } from "../../Component/SweetAlart/SweelAlart";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCarts from "../../hooks/useCarts";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import AddFavoriteProduct from "../../Component/AddFavoriteProduct/AddFavoriteProduct";
import ProductsSlider from "../../Component/ProductsSlider/ProductsSlider";


const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { refetch } = useCarts();
  const [isLoading, setIsLoading] = useState(true);
  // console.log(productDetails);

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const notify = () =>
    toast.success("Cart Added Success!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const res = await axiosPublic.get(`/products/${id}`);
        setProductDetails(res.data);
      } catch (err) {
        console.error("Error fetching product details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductDetails();
  }, [axiosPublic, id]);

  const [path, setPath] = useState("");
  const [collections, setCollections] = useState([]);
  const [totalResult, setTotalResult] = useState(0); 
  

  useEffect(() => {
    const fetchReletedProduct = async () => {
      if (productDetails) {
        const route = `products-releted?_id=${productDetails._id}&category=${productDetails.productCategory[1]}&tags=${productDetails.productTags}`;
        setIsLoading(true);
        try {
          const res = await axiosPublic.get(`/${route}`);
          setCollections(res.data.productResults);
          setTotalResult(res.data.totalResult);
          setPath(route);
        } catch (err) {
          console.error("Error fetching releted product");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchReletedProduct();
  }, [productDetails, axiosPublic]);

  // console.log(productDetail);
  const images = productDetails?.images?.map((image) => ({
    original: image.image_url,
    thumbnail: image.image_url,
  }));

  // console.log(productDetails);

  const handleQuantityMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddtoCart = async () => {
    if (!user) {
      confirmationAlert({
        titleText: "Log In Required",
        confirmButtonText: "Log In Now",
        detailsText:
          "You need to be logged in to add items to your cart. Please log in to continue.",
      }).then((result) => {
        if (result.isConfirmed) {
          return navigate("/login", { state: { from: location.pathname } });
        }
        return;
      });
    }

    if (user) {
      const cartInfo = {
        email: user?.email,
        name: user?.displayName,
        product_id: productDetails._id,
        productName: productDetails.productName,
        productIamge: productDetails.images[0].image_url,
        productPrice: productDetails.finalPrice,
        productCategory: productDetails.productCategory[1],

        quantity: quantity,
      };

      const res = await axiosSecure.post("/carts", cartInfo);
      if (res.data.insertedId) {
        notify();
        refetch();
      }
    }
  };
  if (!productDetails) {
    return <WaitingLoader></WaitingLoader>;
  }
  return (
    <div className="md:max-w-6xl mx-auto mt-3 ">
      <HomeAndBackButton></HomeAndBackButton>
      {isLoading && <WaitingLoader></WaitingLoader>}
      <div className="md:flex md:gap-4 gap-2 ">
        {/* for image  */}
        <div data-aos="zoom-in"  className="md:w-[35%] w-full relative">
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

          {productDetails?.discountAmount && (
            <div className="absolute rounded-full top-1 left-1 h-12 flex flex-col  w-12 bg-[#ff3811]  justify-center -space-y-[5px] items-center text-white p-1 text-sm">
              <span>{productDetails?.discountAmount}tk</span>
              <span>save</span>
            </div>
          )}
          {productDetails?.discountPercent && (
            <div className="absolute top-3 right-0 md:px-3 px-2 text-lg rounded-tl-full rounded-br-full bg-[#ff3811] text-white">
              <span>{productDetails?.discountPercent}%</span>
            </div>
          )}
        </div>

        {/* for others content or details  */}
        <div className=" md:w-[45%] w-full p-2 flex flex-col justify-between md:space-y-2 space-y-1 ">
          {/* product heading or headline or title  */}
          <div>
            <h2 className="md:text-3xl text-xl capitalize ">
              {productDetails?.productName?.toLowerCase()}
            </h2>
            <p className="font-semibold">
              <span className="text-green-500">Stock : </span>
              {productDetails?.stockStatus && productDetails?.stockQuantity ? (
                <span className="text-green-500">Available</span>
              ) : (
                <span className="text-[#ff3811]">Unavailable</span>
              )}
            </p>
          </div>

          {/* product price and ratings  */}
          <div className="flex justify-between items-center ">
            <div className="text-sm md:text-lg flex items-center gap-2 text-[#ff3811]">
              <p>
                Price :{" "}
                <span className="md:text-xl text-lg">
                  {productDetails?.finalPrice}
                </span>{" "}
                Tk
              </p>
              {productDetails?.discountAmount !== 0 && (
                <p className="text-gray-400">
                  <del>{productDetails?.sellPrice}</del>
                </p>
              )}
            </div>
            {(productDetails?.ratings || productDetails?.totalRatingsCount) && (
              <p className="flex items-center gap-1">
                <span className="text-sm md:text-lg">Ratings : </span>
                <span className="flex items-center text-xs md:text-lg">
                  <Rating
                    className="md:max-w-20 max-w-16"
                    value={productDetails?.averageRating}
                    readOnly
                  />
                  <span className="text-[12px] md:text-[14px]">
                    ({productDetails?.totalRatingsCount})
                  </span>
                </span>
              </p>
            )}
          </div>

          {/* product details or description  */}
          <div className="flex-grow">
            <div className="flex justify-between items-center">
              {productDetails?.productBrand && (
                <p>
                  <span className="font-bold">Brand : </span>{" "}
                  {productDetails?.productBrand}
                </p>
              )}
              {productDetails?.productCode && (
                <p className="uppercase">
                  <span className="font-bold">Code : </span>{" "}
                  {productDetails?.productCode}
                </p>
              )}
            </div>
            <p className="text-justify">
              <span className="font-bold">Details : </span>
              {productDetails?.productDetails}
            </p>
          </div>
          {/* product action button  */}
          <div className="space-y-3">
            <hr className="w-full" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <p>Quantity :</p>
                <button
                  onClick={handleQuantityMinus}
                  className={`${
                    quantity === 1
                      ? "btn-disabled text-gray-300"
                      : "text-[#ff3811]  hover:text-[#c6290a]"
                  }  rounded-full text-xl md:text-2xl`}
                >
                  <FaMinusCircle></FaMinusCircle>
                </button>
                <span className=" text-base w-6 text-center md:text-xl -mt-1">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className={`${
                    productDetails?.stockStatus
                      ? "text-[#ff3811] hover:text-[#c6290a] "
                      : "btn-disabled text-gray-300"
                  }  rounded-full  text-xl md:text-2xl`}
                >
                  <FaPlusCircle></FaPlusCircle>
                </button>
              </div>
              <span className="">
                <AddFavoriteProduct
                  product_id={productDetails?._id}
                ></AddFavoriteProduct>
              </span>
            </div>
            <div className="flex gap-2 justify-evenly">
              <button
                onClick={handleAddtoCart}
                disabled={
                  !productDetails?.stockStatus && !productDetails?.stockQuantity
                }
                className={`${
                  productDetails?.stockStatus && productDetails?.stockQuantity
                    ? "text-[#ff3811]  hover:bg-[#ff3811] hover:text-white"
                    : "btn-disabled text-gray-300"
                } w-1/2 md:py-2 py-1 bg-slate-100 `}
              >
                Add to Cart
              </button>
              {productDetails?.stockStatus && productDetails?.stockQuantity ? (
                <Link
                  onClick={handleAddtoCart}
                  to={`/carts`}
                  className={`w-1/2 md:py-2 py-1 text-white bg-[#ff3811] text-center hover:bg-[#c6290a]`}
                >
                  <button className=" ">Buy Now</button>
                </Link>
              ) : (
                <button
                  className={`w-1/2 md:py-2 py-1 btn-disabled text-white bg-gray-300 text-center`}
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
        {/* delivery information  */}

        <DeliveryInfo></DeliveryInfo>
      </div>
      {/* releted Product  */}
      <div className="px-2 md:px-0 md:my-10 my-5 md:space-y-4 space-y-2">
        <h2 className="md:text-3xl text-xl font-bold flex items-center gap-2">
          Releted Products{" "}
        </h2>
       
       <div>
       <ProductsSlider path={path} collections={collections} totalResult={totalResult}/>
       </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetailPage;

// const renderItem = (item) => (
//   <ReactImageMagnify
//     {...{
//       smallImage: {
//         alt: item.originalAlt || "product Image",
//         isFluidWidth: true,
//         src: item.original || "",

//       },
//       largeImage: {
//         src: item.original || "",
//         width: 1426,
//         height: 2000,

//       },

//       enlargedImagePortalId: "portal",
//       isEnlargedImagePortalEnabledForTouch	: false,

//       enlargedImageContainerDimensions: {
//         width: "300%",
//         height: "300%",
//       },
//     }}
//   />
// );
// return (
//   <div className="md:max-w-6xl mx-auto md:flex">
//     {/* image component  */}
//     <div className="md:w-1/4">
//       <ImageGallery
//         items={images}
//         renderItem={renderItem}
//         showNav={false}
//         showThumbnails={true}
//         showFullscreenButton={false}
//         showPlayButton={false}
//         thumbnailPosition="bottom"
//         slideOnThumbnailOver={true}
//       />
//     </div>

//     {/* instruction  */}

//     <div className="md:w-9/12 border relative">
//       <div id="portal" className="absolute  w-full h-full">
//         {/* portal content */}
//       </div>

//       <div className="text-4xl">{productDetail.name}</div>
//     </div>
//     <div style={{height: '1000px'}} />
//   </div>
// );
// };
