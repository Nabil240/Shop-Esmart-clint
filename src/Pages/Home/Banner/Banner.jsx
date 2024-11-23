import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./swiper.style.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { useRef } from "react";
import useBannerLoad from "../../../hooks/useBannerLoad";

const Banner = () => {
  const [bannersData] = useBannerLoad();

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div
      data-aos="fade-left"
      data-aos-duration="1500"
      className="order-1 col-span-4 md:col-span-3 md:order-2"
    >
      <Swiper
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {bannersData[0]?.banners?.map((image) => (
          <SwiperSlide key={image.image_id}>
            <img className="md:h-[500px] w-full" src={image.image_url} alt="" />
          </SwiperSlide>
        ))}

        <div
          className="w-8 h-8 autoplay-progress md:w-12 md:h-12"
          slot="container-end"
        >
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span className="text-xs md:text-lg" ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
