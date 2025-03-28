"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import Image from "next/image";
import { Pagination } from "swiper/modules";

export default function SlidePrViewSlider({ bestInstructors }) {
  console.log(bestInstructors);

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
        className="mySwiper"
      >
        {bestInstructors?.map((instructor, idx) => (
          <SwiperSlide key={idx} className="py-8">
            <div className="group bg-light-bg dark:bg-dark-bg dark:text-light-bg flex w-full cursor-pointer flex-col items-center rounded-lg border p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              {/* Image Container */}
              <div className="relative h-48 w-48 overflow-hidden">
                <Image
                  src={instructor?.profilePicture}
                  alt={instructor?.firstName}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>

              {/* Instructor Details */}
              <h3 className="mt-4 text-center text-lg font-semibold">
                {instructor?.firstName} {instructor?.lastName}
              </h3>
              <p className="text-center text-base capitalize">
                {instructor?.role}
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
