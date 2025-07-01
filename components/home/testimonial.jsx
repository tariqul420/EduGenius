"use client";

import { Quote } from "lucide-react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Heading from "@/components/shared/heading";

const users = [
  {
    image:
      "https://faculty.spagreen.net/demo/public/images/20240210174555image_282x282-34.jpg",
    review:
      "We're loving it. OVOY OMS is highly adaptable and has made our workflow seamless.",
    name: "Natasa Hope",
  },
  {
    image:
      "https://faculty.spagreen.net/demo/public/images/20240210174604image_282x282-72.jpg",
    review:
      "The platform is intuitive and easy to use. It has significantly improved our productivity.",
    name: "Charles Dole",
  },
  {
    image:
      "https://faculty.spagreen.net/demo/public/images/20240210174555image_282x282-34.jpg",
    review:
      "We're loving it. OVOY OMS is highly adaptable and has made our workflow seamless.",
    name: "Natasa Hope",
  },
  {
    image:
      "https://faculty.spagreen.net/demo/public/images/20240210174604image_282x282-72.jpg",
    review:
      "The platform is intuitive and easy to use. It has significantly improved our productivity.",
    name: "Charles Dole",
  },
];

function Testimonial() {
  return (
    <section className="dark:from-dark-theme dark:to-dark-theme bg-gradient-to-t">
      <section className="container mx-auto py-10 max-lg:px-4 lg:max-w-6xl">
        {/* Heading */}
        <Heading
          badge={"Student Voices"}
          title={"What Our Learners Say"}
          subTitle={
            "Real success stories from our community\nTheir achievements are our proudest milestones"
          }
        />

        <div className="relative">
          {/* Swiper for Testimonials */}
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
            breakpoints={{
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
          >
            {users?.map((user, idx) => (
              <SwiperSlide key={idx} className="mb-7 py-8">
                <div className="dark:bg-dark-bg flex w-full cursor-pointer flex-col items-center justify-between gap-8 rounded-lg border bg-white p-8 transition-all duration-300 md:flex-row dark:border-t-[3px] dark:border-b-0">
                  {/* Image Container */}
                  <div className="ring-medium-bg relative h-36 w-36 rounded-full ring-4 dark:ring-[#292b2e]">
                    <Image
                      src={user?.image}
                      alt={user?.name}
                      fill
                      style={{ objectFit: "contain" }}
                      className="rounded-full"
                    />
                    {/* Quote Icon */}
                    <div className="text-main-500 absolute -right-5 -bottom-5 z-10">
                      <Quote size={60} className="text-dark-btn/70" />
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="flex-1 text-center md:text-left">
                    <p className="dark:text-medium-bg mt-2 text-lg text-gray-600 italic">
                      &quot;{user.review}&quot;
                    </p>
                    <h3 className="mt-4 text-xl font-semibold">{user.name}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Swiper Pagination Styles */}
        <style jsx global>{`
          .swiper {
            width: 100%;
            height: 100%;
          }

          .swiper-slide {
            text-align: center;
            font-size: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .swiper-pagination-bullet {
            background-color: #ccc;
            opacity: 1;
            width: 12px;
            height: 12px;
            margin: 0 8px !important;
          }

          .swiper-pagination-bullet-active {
            background-color: #673de5;
          }
        `}</style>
      </section>
    </section>
  );
}

export default Testimonial;
