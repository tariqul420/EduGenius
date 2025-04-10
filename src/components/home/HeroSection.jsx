import { ArrowRight } from "lucide-react";
import Image from "next/image";

function HeroSection() {
  return (
    <section className="dark:to-dark-bg min-h-[550px] bg-gradient-to-t from-white to-white dark:from-black">
      <div className="container mx-auto flex flex-col items-center justify-between px-2 py-8 md:gap-5 md:px-5 md:py-5 lg:max-w-6xl lg:flex-row">
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <p className="dark:text-light-bg text-xl font-semibold md:text-2xl">
            #1 Platform for Online Learning
          </p>
          <h2 className="py-2 text-5xl leading-12 font-bold md:py-5 md:leading-16 lg:text-6xl">
            Enroll &{" "}
            <span className="from-main to-dark-btn relative overflow-hidden bg-gradient-to-r bg-clip-text text-transparent">
              <span className="blaze absolute top-[40px] h-[10px] w-[100px] rotate-60 bg-white blur-xl md:h-[10px] dark:hidden"></span>
              grow up{" "}
            </span>
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
            <button className="bg-light-bg hover:bg-medium-bg cursor-pointer rounded border px-4 py-2.5 text-black duration-200 md:px-6">
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
