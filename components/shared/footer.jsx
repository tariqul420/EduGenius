import { IconBrandAppstore, IconBrandGooglePlay } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

import EduLogo from "./edu-logo";

const Footer = () => {
  return (
    <footer className="dark:to-dark-bg dark:from-dark-bg dark:text-light-bg border-t bg-gradient-to-r px-2 py-5 text-black md:px-5 md:py-10">
      <div className="container mx-auto lg:max-w-6xl">
        {/* Top Section */}
        <div className="flex flex-col px-2 md:px-5 lg:flex-row lg:px-0">
          {/* EduGenius & Description */}
          <div className="lg:w-1/2">
            <EduLogo />
            <p className="mt-2 md:pr-36 lg:mt-0">
              We are a forward-thinking software company dedicated to crafting
              digital experiences that seamlessly blend creativity with
              cutting-edge technology.
            </p>
          </div>
          {/* Subscribe Input Field */}
          <div className="mt-10 lg:mt-0 lg:w-1/2">
            <p className="mb-1 md:text-lg">
              Subscribe Now To Get Special Features!
            </p>
            <div className="dark:bg-dark-hover flex w-full max-w-[450px] items-center overflow-hidden rounded-md border bg-white">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-2 outline-none"
              />
              <button
                style={{ backgroundImage: "url('/star-blaze.gif')" }}
                className="bg-main cursor-pointer rounded-tr-md px-5 py-3 text-white"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="mt-10 flex flex-col items-start px-1.5 md:gap-8 md:px-5 lg:flex-row lg:justify-between lg:p-0">
          <div className="">
            {/* Download app */}
            <div className="mb-10">
              <h3 className="text-main dark:text-sub-main mb-3 text-lg font-bold md:text-xl">
                Download App
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Download our apps in play store and app store
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="https://play.google.com/store"
                  className="hover:bg-light-bg flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-gray-900 transition-colors"
                >
                  <IconBrandGooglePlay className="text-main" size={18} />
                  Google Play Store
                </Link>
                <Link
                  style={{ backgroundImage: "url('/star-blaze.gif')" }}
                  href="https://www.apple.com/app-store/"
                  className="bg-main hover:bg-dark-main dark:bg-dark-bg dark:hover:bg-dark-hover relative flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-white transition-colors"
                >
                  <IconBrandAppstore className="dark:text-main" size={18} />
                  Apple App Store
                  <Image
                    className="absolute right-0 bottom-0 left-0 mx-auto"
                    src="/star-blaze.png"
                    alt="btnBg"
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-3 sm:gap-7 lg:flex-row lg:gap-32">
            {/* Different types of links */}
            <div className="flex flex-col">
              <h2 className="dark:text-sub-main text-main mb-1.5 text-lg font-medium md:mb-3 md:text-xl">
                About
              </h2>
              <Link
                className="hover:text-main mb-1 cursor-pointer text-sm sm:text-base dark:hover:text-gray-300"
                href="/about-us"
              >
                About Us
              </Link>
              <Link
                className="hover:text-main mb-1 cursor-pointer text-sm sm:text-base dark:hover:text-gray-300"
                href="/contact-us"
              >
                Contact Us
              </Link>
              <Link
                className="hover:text-main mb-1 cursor-pointer text-sm sm:text-base dark:hover:text-gray-300"
                href="/faq"
              >
                Faq
              </Link>
            </div>
            <div className="flex flex-col">
              <h2 className="dark:text-sub-main text-main mb-1.5 text-lg font-medium md:mb-3 md:text-xl">
                Legal & Accessibility
              </h2>
              <Link
                className="hover:text-main mb-1 cursor-pointer text-sm sm:text-base dark:hover:text-gray-300"
                href="/privacy-policys"
              >
                Privacy policy
              </Link>
              <Link
                className="hover:text-main mb-1 cursor-pointer text-sm sm:text-base dark:hover:text-gray-300"
                href="/terms"
              >
                Terms
              </Link>
            </div>
            <div className="flex flex-col">
              <h2 className="dark:text-sub-main text-main mb-1.5 text-lg font-medium md:mb-3 md:text-xl">
                Quick Links
              </h2>
              <Link
                className="hover:text-main mb-1 cursor-pointer dark:hover:text-gray-300"
                href="/"
              >
                Home
              </Link>
              <Link
                className="hover:text-main mb-1 cursor-pointer dark:hover:text-gray-300"
                href="/blogs"
              >
                Blog
              </Link>
              <Link
                className="hover:text-main mb-1 cursor-pointer dark:hover:text-gray-300"
                href="/courses"
              >
                Courses
              </Link>
              <Link
                className="hover:text-main mb-1 cursor-pointer dark:hover:text-gray-300"
                href="/instructors"
              >
                Instructor
              </Link>
            </div>
          </div>
        </div>
        <hr className="dark:border-gray-700" />
        {/* copyright section */}
        <p className="mt-5 text-center">
          Copyright @ {new Date().getFullYear()} All Rights Reserved to{" "}
          <Link className="text-main dark:text-gray-300" href="/">
            EduGenius
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
