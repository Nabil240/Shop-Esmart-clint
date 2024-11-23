import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

import { FreeMode } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import AddFavoriteProduct from "../AddFavoriteProduct/AddFavoriteProduct";
import { useEffect } from "react";

const ProductsSlider = ({ path, collections = [], totalResult = 10 }) => {
  useEffect(() => {
    if (!Array.isArray(collections) || collections.length === 0) {
      return;
    }
  }, [collections]);

  return (
    <Swiper
      freeMode={true}
      breakpoints={{
        640: {
          slidesPerView: 2.5,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4.5,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 5.5,
          spaceBetween: 10,
        },
      }}
      slidesPerView={2.5}
      spaceBetween={10}
      modules={[FreeMode]}
      className="mySwiper"
    >
      {collections?.length > 0 &&
        collections?.map((item) => (
          <SwiperSlide 
            className="relative bg-gray-100 dark:bg-gray-900 transform transition duration-500 hover:scale-105"
            key={item._id}
          >
            <Link to={`/product/${item._id}`}>
              <div data-aos="fade-left"   data-aos-duration="1000" className="md:h-[340px] h-48 overflow-hidden pb-1">
                {item?.images[0]?.image_url && (
                  <div className="h-3/4  relative">
                    <img
                      className="w-full h-full object-cover"
                      src={item?.images[0]?.image_url}
                      alt=""
                    />
                    {item?.discountPercent !== 0 && (
                      <span className="absolute bottom-0 left-0 bg-[#ff3811] text-white md:px-2 px-1 rounded-tr-full md:text-base text-sm">
                        {item?.discountPercent}%
                      </span>
                    )}
                  </div>
                )}
                <div className="px-1 flex flex-col justify-evenly h-1/4">
                  <div>
                    <h2 className="md:text-lg text-[10px] capitalize text-justify font-semibol">
                      {item?.productName?.length > 35
                        ? `${item.productName.slice(0, 35)}....`
                        : item.productName}
                    </h2>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs md:text-lg">Tk: {item.finalPrice}</p>{" "}
                    {item?.totalRatingsCount && (
                      <span className="flex items-center text-xs md:text-lg">
                        <Rating
                          className="md:max-w-20 max-w-10"
                          value={item.averageRating}
                          readOnly
                        />
                        <span className="text-[8px] md:text-[12px]">
                          ({item.totalRatingsCount})
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
            <span className={"absolute md:bottom-[90px] bottom-[53px] right-1"}>
              {" "}
              <AddFavoriteProduct product_id={item._id}></AddFavoriteProduct>
            </span>
          </SwiperSlide>
        ))}
      {totalResult > 10 && collections.length !== totalResult && (
        <SwiperSlide className="transform transition duration-500 hover:scale-105">
          <Link to={`/products/${path}`}>
            <div className="min-h-48 md:min-h-[340px] flex justify-center items-center">
              <button className="md:text-xl text-base flex items-center gap-x-2">
                See All{" "}
                <span className="text-[#FF3811]">
                  <FaArrowRightLong />{" "}
                </span>
              </button>
            </div>
          </Link>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default ProductsSlider;
