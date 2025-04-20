"use client";

// import required modules
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SlidePrViewSlider({ bestInstructors }) {
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
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {bestInstructors?.map((instructor, idx) => (
          <SwiperSlide key={idx} className="py-8">
            <div className="group bg-light-bg dark:bg-dark-bg dark:text-light-bg mb-5 flex w-full cursor-pointer flex-col items-center rounded-lg border p-4 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:border-t-[3px] dark:border-b-0">
              {/* Image Container */}
              <div className="relative h-32 w-32 overflow-hidden">
                <Image
                  src={instructor?.instructorId?.profilePicture}
                  alt={instructor?.instructorId?.firstName}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
              {/* InstructorDetails */}
              <h3 className="mt-4 text-center text-lg font-semibold">
                {instructor?.instructorId?.firstName}{" "}
                {instructor?.instructorId?.lastName}
              </h3>
              <p className="text-center text-base capitalize">
                {instructor?.instructorId?.profession || "Instructor"}
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
          width: 100%;
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
