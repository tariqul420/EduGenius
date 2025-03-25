import { ArrowRight } from "lucide-react";
import Image from "next/image";

function HeroSection() {
  return (
    <section className="to-dark-green bg-gradient-to-r from-[#264D3F] py-12 text-white">
      <div className="container m-auto flex flex-col items-center gap-8 px-4 lg:max-w-6xl lg:flex-row">
        {/* Text Content */}
        <div className="flex-1 space-y-5 text-center lg:text-left">
          <p className="text-xl font-semibold md:text-2xl">
            #1 Platform for Online Learning
          </p>
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Enroll & <span className="text-main">grow up</span> your skills
            today!
          </h2>
          <p className="text-sm font-medium md:text-base">
            Explore new skills beyond the world of knowledge and get lost in
            freedom of creativity.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <button className="border-green bg-main flex cursor-pointer items-center gap-2 rounded-md border px-6 py-3 hover:border-white hover:bg-white hover:text-black">
              Start Learning <ArrowRight />
            </button>
            <button className="border-green cursor-pointer rounded-md border px-6 py-3 hover:border-white hover:bg-white hover:text-black">
              Get Started
            </button>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid w-full flex-1 grid-cols-2 gap-4">
          <div className="relative h-48 overflow-hidden rounded-lg shadow-lg sm:h-64">
            <Image
              src="/images/hero1.png"
              alt="Hero 1"
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="/images/hero1.png"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative h-48 overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/images/hero2.png"
              alt="Hero 2"
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="/images/hero2.png"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative h-48 overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/images/hero3.png"
              alt="Hero 3"
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="/images/hero3.png"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative h-48 overflow-hidden rounded-lg shadow-lg sm:h-64">
            <Image
              src="/images/hero4.png"
              alt="Hero 4"
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="/images/hero4.png"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
