
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Charles Dale",
    image: "/testomonial1.jpg",
    review: "We're Loving it. OVOY LMS is both perfect and highly adaptable.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    image: "/testomonial2.jpg",
    review: "OVOY LMS helped me improve my skills rapidly. Highly recommend!",
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-10/12 mx-auto my-8">
      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Testimonial</h1>
        <p className="text-gray-600">
          We value our students and whatever they say about us, is our achievement.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative p-8 border mt-8 flex flex-col md:flex-row items-center text-center md:text-left shadow-2xl">
        {/* Left Arrow */}
        <button
          className="absolute left-4 mr-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-500 text-2xl"
          onClick={handlePrev}
        >
          <FaArrowLeft />
        </button>

        {/* Testimonial Content */}
        <motion.div
          key={testimonials[index].id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center"
        >
          {/* Image Section */}
          <div className="">
            <img
              className="rounded-full border-4 p-2 border-green-300"
              src={testimonials[index].image}
              alt="Testimonial"
            />
          </div>

          {/* Text Section */}
          <div className="mt-4 md:mt-0 md:ml-6">
            <h1 className=" ">"{testimonials[index].review}"</h1>
            <p className="text-gray-500 font-medium mt-2">- {testimonials[index].name}</p>
          </div>
        </motion.div>

        {/* Right Side Content */}
        <div className="mt-8 md:mt-0 md:ml-10 text-left max-w-md">
          <h2 className="text-xl font-bold text-gray-800">Why Choose Us?</h2>
          <p className="text-gray-600 mt-4">
            Our Learning Management System (LMS) is designed to help you achieve your goals effectively.
            With engaging features, interactive lessons, and real-time updates, it’s the best choice for students of all levels.
          </p>
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">
            Learn More
          </button>
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-500 text-2xl"
          onClick={handleNext}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Testimonial;
