"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { instructors } from "@/constant";
import Image from "next/image";
import { Pagination } from "swiper/modules";

export default function SlidePrViewSlider() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper">
        {instructors.map((instructor, idx) => (
          <SwiperSlide key={idx} className="py-8">
            <div className="p-6 bg-white group rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center hover:bg-green hover:-translate-y-2 cursor-pointer w-full">
              {/* Image Container */}
              <div className="relative w-48 h-48 overflow-hidden">
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>

              {/* Instructor Details */}
              <h3 className="text-center text-lg mt-4 font-semibold text-gray-800 group-hover:text-white">
                {instructor.name}
              </h3>
              <p className="text-center text-base text-gray-600 group-hover:text-gray-200">
                {instructor.title}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper Pagination Styles */}
      <style jsx global>{`
        .swiper {
          width: 100%;
          height: 100%;
        }

        .swiper-slide {
          text-align: center;
          font-size: 18px;

          /* Center slide text vertically */
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .swiper-pagination-bullet {
          background-color: #ffffff; /* Change this to your desired color */
        }
        .swiper-pagination-bullet-active {
          background-color: #000000; /* Change this to your desired active color */
        }
      `}</style>
    </>
  );
}
