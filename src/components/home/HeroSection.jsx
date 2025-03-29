import { ArrowRight } from "lucide-react";
import Image from "next/image";

function HeroSection() {
  return (
    <section className="bg-gradient-to-t from-white to-white dark:from-black dark:to-dark-bg min-h-[550px]">
      <div className="container mx-auto flex flex-col items-center justify-between px-2 md:px-5 lg:max-w-6xl lg:flex-row md:gap-5 py-8 md:py-5">
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <p className="text-xl font-semibold md:text-2xl dark:text-light-bg">
            #1 Platform for Online Learning
          </p>
          <h2 className="py-2 md:py-5 font-bold leading-12 md:leading-16 text-5xl lg:text-6xl">
            Enroll &{" "}
            <span className="from-main to-dark-btn bg-gradient-to-r bg-clip-text text-transparent relative overflow-hidden">
            <span className="absolute dark:hidden blaze top-[40px] w-[100px] h-[10px] md:h-[10px] blur-xl bg-white rotate-60"></span>
            grow up {" "}
          </span>

            your skills today!
          </h2>
          <p className="text-sm md:text-base md:pr-10 dark:text-medium-bg">
            Step beyond the limits of knowledge and embrace the art of
            discovery, where creativity knows no bounds and new skills ignite
            endless possibilities.
          </p>
          <div className="mt-5 mb-5 flex items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <button className="border-green bg-main hover:bg-dark-main hover:text-medium-bg flex cursor-pointer items-center gap-2 rounded border px-4 md:px-6 py-2.5 text-white duration-200">
              Start Learning <ArrowRight />
            </button>
            <button className="bg-light-bg hover:bg-medium-bg cursor-pointer rounded border px-4 md:px-6 py-2.5 text-black duration-200">
              Get Started
            </button>
          </div>
        </div>
        {/* Image Grid */}
        <div className="mt-5 grid w-full md:w-[600px] grid-cols-2 gap-5">
          {/* Full-width Image */}
          <div className="relative col-span-2 h-[200px] md:h-[250px]">
            <Image
              src="/hero-image-1.jpg"
              alt="Hero Image"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* First Half-width Image */}
          <div className="relative col-span-1 h-[150px] md:h-[200px]">
            <Image
              src="/hero-image-2.jpeg"
              alt="Hero Image"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Second Half-width Image */}
          <div className="relative col-span-1 h-[150px] md:h-[200px]">
            <Image
              src="/hero-image-3.jpg"
              alt="Hero Image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
