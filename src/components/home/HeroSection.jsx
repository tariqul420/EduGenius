import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { ParticlesDemo } from "./HeroPerticals";
// import { AuroraText } from "../magicui/aurora-text";

function HeroSection() {
  return (
    <section className="relative min-h-[650px] overflow-hidden dark:bg-black">
      <div className="absolute h-[calc(100%-100px)] w-full">
        <ParticlesDemo />
      </div>
      <div className="relative container mx-auto flex h-full flex-col items-center justify-between overflow-hidden px-2 py-12 md:gap-5 md:px-5 lg:max-w-6xl lg:flex-row">
        <Image
          style={{ animationDuration: "20s" }}
          className="absolute w-full animate-spin object-cover md:max-w-[1000]"
          width={100}
          height={100}
          alt="Hero_Gradient"
          src="/Hero-gradient-1.png"
        ></Image>
        {/* Text Content */}
        <div className="z-[5] text-center lg:text-left">
          <p className="dark:text-light-bg text-xl font-medium md:text-2xl md:font-semibold">
            #1 Platform for Online Learning
          </p>
          <h2 className="py-2 text-5xl leading-13 font-bold md:py-5 md:leading-16 lg:text-6xl">
            Enroll &{" "}
            <span className="from-main to-dark-btn relative -top-1 overflow-hidden bg-gradient-to-r bg-clip-text text-transparent md:top-0">
              <span className="blaze absolute top-[40px] h-[10px] w-[100px] rotate-60 bg-white blur-xl md:h-[10px] dark:hidden"></span>
              grow up{" "}
            </span>
            {/* <AuroraText  colors={["#673de5", "#ed187b"]}>Grow Up</AuroraText> */}{" "}
            your skills today!
          </h2>
          <p className="dark:text-medium-bg text-sm md:pr-10 md:text-base">
            Step beyond the limits of knowledge and embrace the art of
            discovery, where creativity knows no bounds and new skills ignite
            endless possibilities.
          </p>
          <div className="mt-5 mb-5 flex items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <button className="border-green bg-main hover:bg-dark-main hover:text-medium-bg flex cursor-pointer items-center gap-2 rounded border px-4 py-2.5 text-white duration-200 md:px-6">
              Start Learning <ArrowRight />
            </button>
            <button className="bg-light-bg hover:bg-medium-bg cursor-pointer rounded border px-4 py-2.5 text-black shadow duration-200 md:px-6">
              Get Started
            </button>
          </div>
        </div>
        {/* Image Grid */}
        <div className="mt-5 grid w-full grid-cols-2 gap-5 md:w-[600px]">
          {/* Full-width Image */}
          <div className="relative col-span-2 h-[200px] md:h-[250px]">
            <Image
              src="/hero-image-1.jpg"
              alt="Hero Image"
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* First Half-width Image */}
          <div className="relative col-span-1 h-[150px] md:h-[200px]">
            <Image
              src="/hero-image-2.jpeg"
              alt="Hero Image"
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* Second Half-width Image */}
          <div className="relative col-span-1 h-[150px] md:h-[200px]">
            <Image
              src="/hero-image-3.jpg"
              alt="Hero Image"
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
