import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./banner.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router";

const Banner = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div
          className="hero xl:min-h-[590px] lg:min-h-[540px] md:min-h-[500px] sm:min-h-[450px] min-h-[420px] object-cover"
          style={{
            backgroundImage: "url('https://i.ibb.co/3mjXpY0k/Hero-Image.png')",
          }}
        >
          <div className="hero-overlay z-0 opacity-65 bg-[#111827]"></div>
          <div className="hero-content text-center">
            <div className="max-w-[80%] py-10">
              <h1 className="mb-5 lg:text-6xl md:text-5xl text-4xl text-white font-bold">
                Up to 40% Off on Bulk Electronics
              </h1>
              <p className="mb-5 text-white">
                Buy trending gadgets in bulk for your business and save big.
                Limited-time offer for verified buyers.
              </p>
              <Link
                to="categories/Electronics%20&%20Gadgets"
                className="btn btn-primary text-base-100"
              >
                Shop Electronics
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div
          className="hero xl:min-h-[590px] lg:min-h-[540px] md:min-h-[500px] sm:min-h-[450px] min-h-[420px] object-cover"
          style={{
            backgroundImage: "url('https://i.ibb.co/5WLN6s1f/Hero-Image.png')",
          }}
        >
          <div className="hero-overlay z-0 opacity-65 bg-[#111827]"></div>
          <div className="hero-content text-center">
            <div className="max-w-[80%] py-10">
              <h1 className="mb-5 lg:text-6xl md:text-5xl text-4xl text-white font-bold">
                Wholesale Apparel – Just $2/Item!
              </h1>
              <p className="mb-5 text-white">
                Upgrade your store inventory with high-demand fashion items.
                Bulk only. While stock lasts.
              </p>
              <Link
                to="categories/Fashion%20&%20Apparel"
                className="btn btn-primary text-base-100"
              >
                Explore Deals
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide>
        <div
          className="hero xl:min-h-[590px] lg:min-h-[540px] md:min-h-[500px] sm:min-h-[450px] min-h-[420px] object-cover"
          style={{
            backgroundImage: "url('https://i.ibb.co/yckQwK2C/Hero-Image.png')",
          }}
        >
          <div className="hero-overlay z-0 opacity-65 bg-[#111827]"></div>
          <div className="hero-content text-center">
            <div className="max-w-[80%] py-10">
              <h1 className="mb-5 lg:text-6xl md:text-5xl text-4xl text-white font-bold">
                Power Tools in Bulk – Save 25%
              </h1>
              <p className="mb-5 text-white px-4">
                High-performance industrial supplies at wholesale rates. Get a
                custom quote today!
              </p>
              <Link
                to="categories/Industrial%20Machinery%20&%20Tools"
                className="btn btn-primary text-base-100"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
