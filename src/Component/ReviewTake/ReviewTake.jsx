import { Rating } from "@smastrom/react-rating";
import { Controller, useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { confirmAlert } from "./../SweetAlart/SweelAlart";
import { useState } from "react";
import useAuth from "./../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ReviewTake = ({ onClose, _id, refetch }) => {
  const navigate = useNavigate(); 
    
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      review: "",
      ratings: 0,
    },
  });

  const onSubmit = async (data) => {
    const review = data.review;
    const rating = data.ratings;

    const reviewInfo = { productId: _id, user: user.email, rating, review };

    try {
      setLoading(true);
      const res = await axiosSecure.patch("/products-review", reviewInfo);
      
      if (res.data.matchedCount > 0) {
        confirmAlert("Thanks For Your Ratings!");
        onClose();
        refetch();
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="md:w-[80%] md:mx-auto mx-2 flex flex-col space-y-5 mt-4 justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <textarea
        rows={2}
        className="w-full p-2 border border-black"
        {...register("review")}
        placeholder="Your Honest Review"
      ></textarea>

      <div className="space-y-2">
        <div className="text-center text-2xl">Ratings</div>
        <Controller
          control={control}
          name="ratings"
          rules={{
            validate: (rating) => rating > 0,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Rating
              value={value}
              isRequired
              onChange={onChange}
              visibleLabelId="rating_label"
              className="md:max-w-52 max-w-44"
              onBlur={onBlur}
            />
          )}
        />
        {errors.ratings && (
          <div className="mt-2 text-red-500 text-center">
            Rating is required.
          </div>
        )}
      </div>

      {loading ? (
        <button
          disabled={loading}
          className="bg-[#ff3811] hover:bg-red-700 py-1 px-5 text-white text-center"
        >
          Submiting...
        </button>
      ) : (
        <button
          disabled={loading}
          className="bg-[#ff3811] hover:bg-red-700 py-1 px-5 text-white text-center"
          type="submit"
        >
          Submit Review
        </button>
      )}
    </form>
  );
};

export default ReviewTake;
