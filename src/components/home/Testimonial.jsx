"use client";

import Heading from "@/components/shared/Heading";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Quote } from "lucide-react";

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
    <section className="dark:from-dark-bg/50 dark:to-dark-bg/5 bg-gradient-to-t py-8">
      <section className="container mx-auto py-8 max-lg:px-4 lg:max-w-6xl">
        {/* Heading */}
        <Heading
          title="Testimonial"
          subTitle="We value our students and whatever they say about us, is our achievement."
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
              <SwiperSlide key={idx} className="py-8 mb-7">
                <div className="bg-light-bg dark:bg-dark-bg flex w-full cursor-pointer flex-col items-center dark:border-t-[3px] dark:border-b-0 justify-between gap-8 rounded-lg border p-8 transition-all duration-300 md:flex-row">
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
