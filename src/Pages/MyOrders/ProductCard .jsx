import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Rating } from "@smastrom/react-rating";

const ProductCard = ({
  product,
  setIsModalOpen,
  setSelectedProduct,
  order_status,
  refetch
}) => {
  const axiosSecure = useAxiosSecure();
  const { productIamge, productPrice, quantity, product_id } = product;

  const [checkReview, setCheckReview] = useState(false);
  const [userReview, setUserRivew] = useState({});

  

  // check reviews.

  useEffect(() => {
    const checkReviewStatus = async () => {
      try {
        const response = await axiosSecure.get(
          `/products-review-check/${product_id}`
        );
        if(response.data.ratingSubmit){
          setCheckReview(response.data?.ratingSubmit);
          setUserRivew(response.data?.userReview || null);
        }
        else{
          setCheckReview(response.data?.ratingSubmit); 
          setUserRivew(null)
        }
        
      } catch (error) {
        console.error("Error checking review status", error);
      }
    };

    checkReviewStatus();
    refetch()
  }, [axiosSecure, product_id, refetch]);

  const handleReviewClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="border  rounded-lg shadow-lg flex items-center gap-2 p-3">
      <div className="h-40 w-[40%]">
        <img
          src={productIamge}
          alt="Product Image"
          className="h-full w-full object-cover "
        />
      </div>
      <div className="w-[60%]">
        <p className="text-sm font-bold">Price: {productPrice} BDT</p>
        <p className="text-sm">Quantity: {quantity}</p>
        <Link
          to={`/product/${product_id}`}
          className="my-1 inline-block text-blue-500 hover:underline"
        >
          View Product
        </Link>
        {order_status === "Delivered" && (
          <>
            {!checkReview ? (
              <button
                className="block text-base py-1 px-2  mt-2 bg-[#ff3811] hover:bg-red-700 text-white"
                onClick={() => handleReviewClick(product)}
              >
                Get Review
              </button>
            ) : (
              <div className="mt-2 w-full">
                <Rating
                  className="md:max-w-20 max-w-16"
                  value={userReview?.rating}
                  readOnly
                />{" "}
                <p className="text-xs">{userReview?.review}</p>
              </div>
            )}{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
