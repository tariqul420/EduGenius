import { ArrowRight, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BorderBeam } from "../magicui/border-beam";

import { ParticlesDemo } from "./HeroPerticals";
// import { AuroraText } from "../magicui/aurora-text";

function HeroSection() {
  return (
    <section className="relative min-h-[550px] overflow-hidden">
      <div className="absolute h-[calc(100%-40px)] w-full">
        <ParticlesDemo />
      </div>
      <div className="relative container mx-auto flex h-full flex-col items-center justify-between overflow-hidden px-2 py-5 md:gap-5 md:px-5 lg:max-w-6xl lg:flex-row">
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
          <div className="dark:text-light-bg to-light-theme relative mx-auto w-fit rounded-md border bg-gradient-to-b from-white px-3 py-2 text-sm shadow lg:mx-0 dark:from-[#17122dcc] dark:to-[#17122d5f]">
            #1 Platform for Online Learning
            <BorderBeam colorFrom="#512feb" colorTo="#ed187bda" size={70} />
          </div>
          <h2 className="py-2 text-5xl leading-13 font-bold md:py-5 md:leading-16 lg:text-6xl">
            Enroll &{" "}
            <span className="from-main to-dark-btn relative -top-1 overflow-hidden bg-gradient-to-r bg-clip-text text-transparent md:top-0">
              <span className="blaze bg-light-bg absolute top-[40px] h-[10px] w-[80px] rotate-60 blur-xl md:h-[10px] dark:hidden"></span>
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
            <Link
              href="/courses"
              className="border-green bg-main hover:bg-dark-main hover:text-medium-bg flex cursor-pointer items-center gap-2 rounded border px-4 py-2.5 text-white duration-200 md:px-6"
            >
              Start Learning <ArrowRight />
            </Link>
            <Link
              href="/sign-in"
              className="hover:bg-light-bg flex cursor-pointer items-center gap-2 rounded border bg-white px-4 py-2.5 text-black shadow duration-200 md:px-6"
            >
              <LinkIcon className="animate-spin duration-[3s]" size={18}/> Join Us
            </Link>
          </div>
        </div>
        {/* Image Grid */}
        <div className="mt-5 grid w-full grid-cols-2 gap-5 px-3 sm:px-0 md:w-[600px]">
          {/* Full-width Image */}
          <div className="relative col-span-2 h-[200px] md:h-[250px]">
            <Image
              src="/hero-image-1.avif"
              alt="Hero Image"
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* First Half-width Image */}
          <div className="relative col-span-1 h-[150px] md:h-[200px]">
            <Image
              src="/hero-image-2.png"
              alt="Hero Image"
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* Second Half-width Image */}
          <div className="relative col-span-1 h-[150px] md:h-[200px]">
            <Image
              src="/hero-image-3.avif"
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
