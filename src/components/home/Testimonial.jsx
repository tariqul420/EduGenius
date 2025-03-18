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
        image: "https://faculty.spagreen.net/demo/public/images/20240210174555image_282x282-34.jpg",
        review: "We're loving it. OVOY OMS is highly adaptable and has made our workflow seamless.",
        name: "Natasa Hope",
    },
    {
        image: "https://faculty.spagreen.net/demo/public/images/20240210174604image_282x282-72.jpg",
        review: "The platform is intuitive and easy to use. It has significantly improved our productivity.",
        name: "Charles Dole",
    },
];

function Testimonial() {
    return (
        <section className="container mx-auto lg:max-w-6xl my-20 px-4">
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
                            slidesPerView: 1,
                        },
                    }}
                >
                    {users?.map((user, idx) => (
                        <SwiperSlide key={idx} className="py-8">
                            <div className="p-8 dark:bg-black-light rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-8 items-center justify-between cursor-pointer w-full">
                                {/* Image Container */}
                                <div className="relative w-48 h-48 overflow-hidden rounded-full ring-4 ring-green">
                                    <Image
                                        src={user.image}
                                        alt={user.name}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        className="rounded-full"
                                    />
                                </div>

                                {/* Quote Icon */}
                                <div className="text-green-500">
                                    <Quote size={60} fill="#25ab7c" color="#25ab7c" />
                                </div>

                                {/* User Details */}
                                <div className="flex-1 text-center md:text-left">
                                    <p className="text-lg text-gray-600 dark:text-gray-200 mt-2 italic">
                                        &quot;{user.review}&quot;
                                    </p>
                                    <h3 className="text-xl font-semibold mt-4">
                                        {user.name}
                                    </h3>
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
                    background-color: #25ab7c;
                }
            `}</style>
        </section>
    );
}

export default Testimonial;