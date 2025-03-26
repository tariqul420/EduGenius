"use client";
import {
  Facebook,
  GraduationCap,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="dark:to-dark-bg border-t  dark:from-dark-bg text-black bg-gradient-to-r py-12 dark:text-white">
      <div className="container m-auto lg:max-w-6xl">
        {/* Top Section */}
        <div className="flex flex-col px-5 lg:flex-row lg:px-0">
          {/* EduGenius & Description */}
          <div className="lg:w-1/2">
            <div className="flex items-center justify-center gap-2 text-3xl lg:justify-start">
              <GraduationCap className="text-main" />
              <h2 className="text-xl font-bold">EduGenius</h2>
            </div>
            <p className="mt-2 text-center lg:mt-0 lg:w-[70%] lg:text-left">
              We are a forward-thinking software company dedicated to crafting
              digital experiences that seamlessly blend creativity with
              cutting-edge technology.
            </p>
          </div>
          {/* Subscribe Input Field */}
          <div className="mt-10 lg:mt-0 lg:w-1/2">
            <p className="mb-1 text-sm font-semibold">
              Subscribe Now To Get Special Features!
            </p>
            <div className="flex w-full items-center overflow-hidden rounded-lg border border-gray-400">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-transparent px-4 py-3 text-white placeholder-gray-300 outline-none"
              />
              <button className="bg-main m-2 cursor-pointer rounded-lg px-5 py-3 font-semibold text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="flex flex-col items-start px-5 md:flex-row md:gap-8 mt-5 lg:justify-between lg:p-0">
          <div className="">
            {/* Social Icons */}
            <div className="flex items-center gap-2 text-4xl">
              <Facebook
                size={35}
                className="hover:bg-main cursor-pointer rounded-full shadow bg-light-bg p-2"
              />
              <Twitter
                size={35}
                className="hover:bg-main cursor-pointer rounded-full shadow bg-light-bg p-2"
              />
              <Linkedin
                size={35}
                className="hover:bg-main cursor-pointer rounded-full shadow bg-light-bg p-2"
              />
              <Instagram
                size={35}
                className="hover:bg-main cursor-pointer rounded-full shadow bg-light-bg p-2"
              />
              <Youtube
                size={35}
                className="hover:bg-main cursor-pointer rounded-full shadow bg-light-bg p-2"
              />
            </div>

            <h3 className="mt-5 mb-5 font-bold">Download App</h3>

            {/* Download app  */}
            <div className="mb-10">
              <h3>Download our apps in play store and app store</h3>
              <div className="mt-3 flex gap-5">
                <Link href="https://play.google.com/store">
                  Google Play Store
                </Link>
                <Link href="https://www.apple.com/app-store/">
                  Apple App Store
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-7 lg:flex-row lg:gap-32">
            {/* Different types of links */}
            <div className="flex flex-col">
              <h2 className="mb-3 font-bold">Useful Links</h2>
              <Link className="mb-1 cursor-pointer" href="/aboutUs">
                About Us
              </Link>
              <Link className="mb-1 cursor-pointer" href="/refund">
                Refund Policy
              </Link>
              <Link className="mb-1 cursor-pointer" href="/faq">
                FAQ
              </Link>
            </div>
            <div className="flex flex-col">
              <h2 className="mb-3 font-bold">Resources</h2>
              <Link className="mb-1 cursor-pointer" href="/contactUs">
                Contact Us
              </Link>
              <Link className="mb-1 cursor-pointer" href="/joinInstructor">
                Join as Instructor
              </Link>
              <Link className="mb-1 cursor-pointer" href="/aboutUs">
                Blog
              </Link>
            </div>
            <div className="flex flex-col">
              <h2 className="mb-3 font-bold">Quick Links</h2>
              <Link className="mb-1 cursor-pointer" href="/store">
                Book Store
              </Link>
              <Link className="mb-1 cursor-pointer" href="/offer">
                Available Offer
              </Link>
              <Link className="mb-1 cursor-pointer" href="/courses">
                Popular Courses
              </Link>
            </div>
          </div>
        </div>
        <hr className="mt-5 text-gray-500" />
        {/* copyright section */}
        <p className="mt-8 text-center">
          Copyright @ 2025 All Rights Reserved to <Link className="text-dark-main dark:text-dark-bg" href='/'>EduGenius</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
