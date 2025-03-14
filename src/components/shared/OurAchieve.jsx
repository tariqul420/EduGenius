"use client";
import React from "react";
import { motion } from "framer-motion";
const OurAchieve = () => {
  return (
    <div className="w-10/12   mx-auto my-12">
      <div className=" text-center lg:text-start">
        <h1 className=" text-4xl">Our Achievement</h1>
        <p className=" text-gray-500">
          Your achievement is considered as our achievement. Whatever you learn
          from us, even if it’s a little – we will be proud to be a part of your
          journey.
        </p>
      </div>
      <div className=" grid grid-cols-4 mt-8  ">
        <div className=" md:col-span-2 col-span-4 ">
          {/* left part */}
          <div className=" space-y-8  mt-4 grid grid-cols-2">
            <div className="space-y-4 lg:flex lg:space-x-4 items-center ">
              <img
                className="p-4 bg-white-400 border-2 border-green-300  rounded-full "
                src="/teacher.svg"
                alt=""
              />
              <div className="font-bold">
                <h1>9 +</h1>
                <p className="text-gray-500"> Teacher</p>
              </div>
            </div>
            <div className="space-y-4 lg:flex lg:space-x-4 items-center">
              <img
                className="p-4 bg-white-400 border-2 border-green-300  rounded-full "
                src="/live-streaming.svg"
                alt=""
              />
              <div className=" font-bold">
                <h1>90 +</h1>
                <p className="text-gray-500"> Video</p>
              </div>
            </div>
            <div className="space-y-4 lg:flex lg:space-x-4 items-center">
              <img
                className=" p-4 bg-white-400 border-2 border-green-300  rounded-full"
                src="/student.svg"
                alt=""
              />
              <div className="font-bold ">
                <h1>345 +</h1>
                <p className="text-gray-500"> students</p>
              </div>
            </div>
            <div className="space-y-4 lg:flex lg:space-x-4 items-center">
              <img
                className="p-4 bg-white-400 border-2 border-green-300  rounded-full "
                src="/rocket.svg"
                alt=""
              />
              <div className="font-bold ">
                <h1>9043534 +</h1>
                <p className="text-gray-500"> App User</p>
              </div>
            </div>
          </div>
        </div>
        {/* right part */}
        <div className=" md:col-span-2  col-span-4 flex relative overflow-hidden ">
          {/* first img */}
          <div className="">
            <div className="">
              <img className="" src="/dot-pattern (1).svg" alt="" />
            </div>
            <div className=" absolute">
            <motion.img 
            animate={{x:[50,100,50]}}
            transition={{duration:5,repeat:Infinity}} className=" relative z-10 rounded-t-[20px] w-full h-auto object-cover" src="/achievemntimg1.png" alt="" />
            </div>
          </div>
          {/* second img */}
         
          <div>
          
          <div className=" ">
            <motion.img 
            animate={{x:[80,30,80]}}
            transition={{duration:5,repeat:Infinity}}
            
            className="rounded-b-[20px] relative z-10  w-full h-auto object-cover" src="/achievement2.jpeg " alt="" />
          </div>
          <div>
           
            <img className=" object-cover" src="dot-pattern.svg" alt="" />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAchieve;



