import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa";
import "./testimonial.css";
import HomeSectionHeader from "../common/HomeSectionHeader";

const testimonials = [
  {
    name: "Shahadat Hossain",
    title: "Wholesaler, Bogura",
    image: "https://i.ibb.co.com/PsyxSCmg/2.png",
    text: "BulkNest connects me directly with retailers, removing middlemen and increasing my profit. Managing bulk stock online is simple, fast, and saves me valuable time every day.",
  },
  {
    name: "Anika Rahman",
    title: "Retailer, Dhaka",
    image: "https://i.ibb.co.com/YFMsbLHs/8.png",
    text: "I rely on BulkNest for high-quality wholesale goods at great prices. Deliveries are on time, and I can find trusted suppliers all in one place without any hassle.",
  },
  {
    name: "Sajib Khan",
    title: "Logistics Partner, Comilla",
    image: "https://i.ibb.co.com/My5fjQC5/3.png",
    text: "The delivery tracking and route tools make shipments smooth and efficient. I can complete my deliveries faster while avoiding mistakes, keeping clients satisfied every time.",
  },
  {
    name: "Nurul Islam",
    title: "Manufacturer, Rajshahi",
    image: "https://i.ibb.co.com/zVjcVPs0/4.png",
    text: "Uploading my product catalog and tracking orders is easy with BulkNest. The real-time dashboard keeps me updated and makes managing my wholesale business stress-free.",
  },
  {
    name: "Mithila Haque",
    title: "Retailer, Chattogram",
    image: "https://i.ibb.co.com/hwBZJxP/10.png",
    text: "Transparent pricing and smooth tracking make BulkNest my first choice. I always receive quality products on time, and restocking my store has never been easier.",
  },
  {
    name: "Arman Kabir",
    title: "Logistics Partner, Khulna",
    image: "https://i.ibb.co.com/RkFLXrHs/5.png",
    text: "BulkNest keeps my delivery schedule organized with clear updates. I get all the order details I need, so every shipment reaches its destination without delays.",
  },
  {
    name: "Tanvir Alam",
    title: "Admin",
    image: "https://i.ibb.co.com/DfYcb8Kj/6.png",
    text: "BulkNest’s dashboard gives me full control over orders, users, and analytics. The detailed reports help me make smart decisions and improve the platform’s growth.",
  },
  {
    name: "Nabila Sultana",
    title: "Retailer, Sylhet",
    image: "https://i.ibb.co.com/yFsr6dXb/11.png",
    text: "I trust BulkNest for reliable wholesale sourcing. Supplier profiles and reviews make it easy to ensure product quality before I buy, giving me complete confidence.",
  },
  {
    name: "Hasan Mahmud",
    title: "Wholesaler, Mymensingh",
    image: "https://i.ibb.co.com/0pVZMtjF/7.png",
    text: "Since joining BulkNest, my sales have doubled. The platform’s easy interface and powerful outreach tools help me connect with more buyers and grow my business.",
  },
  {
    name: "Sumaiya Zerin",
    title: "Retailer, Barisal",
    image: "https://i.ibb.co.com/RpbF54rm/12.png",
    text: "BulkNest’s clean design, excellent service, and product quality make it my go-to wholesale platform. It has streamlined my purchasing process and boosted my store’s supply chain.",
  },
];

const Testimonial = () => {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const cardsRef = useRef([]);
  const [maxHeight, setMaxHeight] = useState(0);

  const updateSlideClasses = (swiper) => {
    const slides = swiper.slides;
    const center = swiper.activeIndex;

    slides.forEach((slide) => {
      slide.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      slide.style.opacity = "0.3";
      slide.style.transform = "scale(0.9)";
      slide.style.transformOrigin = "bottom";
    });

    if (slides[center]) {
      slides[center].style.opacity = "1";
      slides[center].style.transform = "scale(1)";
    }
    if (slides[center - 1]) {
      slides[center - 1].style.opacity = "0.6";
      slides[center - 1].style.transform = "translateY(30px)";
    }
    if (slides[center + 1]) {
      slides[center + 1].style.opacity = "0.6";
      slides[center + 1].style.transform = "translateY(30px)";
    }
    if (slides[center - 2]) {
      slides[center - 2].style.opacity = "0.2";
      slides[center - 2].style.transform = "translateY(60px)";
    }
    if (slides[center + 2]) {
      slides[center + 2].style.opacity = "0.2";
      slides[center + 2].style.transform = "translateY(60px)";
    }
  };

  useEffect(() => {
    if (cardsRef.current.length) {
      let max = 0;
      cardsRef.current.forEach((card) => {
        if (card) {
          const height = card.getBoundingClientRect().height;
          if (height > max) max = height;
        }
      });
      setMaxHeight(max);
    }
  }, [maxHeight]);

  return (
    <div className="py-8 text-center relative bg-base-100">
      <HomeSectionHeader
        title="Testimonials"
        subtitle="Powering success for businesses, suppliers, and delivery networks across Bangladesh."
      />
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateSlideClasses(swiper);
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSlideChange={(swiper) => updateSlideClasses(swiper)}
        slidesPerView={1}
        centeredSlides
        loop
        spaceBetween={10}
        speed={500}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        className="mx-auto px-4 pb-8 mySwiper"
        breakpoints={{
          768: {
            slidesPerView: 1.5,
          },
          1024: {
            slidesPerView: 2,
          },
          1536: {
            slidesPerView: 3,
          },
          1800: {
            slidesPerView: 4,
          },
        }}
      >
        {testimonials.map((item, i) => (
          <SwiperSlide key={i} className="flex justify-center mb-8 px-2">
            <div
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ height: maxHeight ? `${maxHeight}px` : "auto" }}
              className="bg-base-200 rounded-2xl shadow-md shadow-primary/5 flex flex-col justify-center text-secondary relative flex-1"
            >
              <div className="absolute top-0 left-0 w-full h-full z-0">
                <FaQuoteLeft className="absolute top-4 left-4 text-primary/10 text-7xl pointer-events-none" />
              </div>

              <div className="relative z-10 px-8 py-8 h-full flex flex-col justify-between">
                <p className="pb-4 mt-4 text-left">{item.text}</p>

                <div className="flex items-center gap-4 pt-4 border-t-4 border-dashed border-t-primary/40">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 overflow-hidden">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-secondary/60">{item.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className=" flex justify-center items-center select-none -mt-5">
        <div className="flex items-center bg-transparent px-4 rounded-full">
          <button
            ref={prevRef}
            className="custom-next text-base-100 hover:scale-110 transition  bg-primary p-2 rounded-full cursor-pointer z-10"
          >
            <FaArrowLeft className="text-2xl" />
          </button>
          <div className="custom-swiper-pagination flex justify-center gap-1 px-5" />
          <button
            ref={nextRef}
            className="custom-next text-base-100 hover:scale-110 transition  bg-primary p-2 rounded-full cursor-pointer z-10"
          >
            <FaArrowRight className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
