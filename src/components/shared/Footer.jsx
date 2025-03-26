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
    <footer className="dark:to-dark-bg border-t  dark:from-dark-bg text-black bg-gradient-to-r py-5 md:py-10 dark:text-light-bg">
      <div className="container m-auto lg:max-w-6xl">
        {/* Top Section */}
        <div className="flex flex-col px-5 lg:flex-row lg:px-0">
          {/* EduGenius & Description */}
          <div className="lg:w-1/2">
            <div className="flex items-center justify-center gap-2 text-3xl lg:justify-start">
              <GraduationCap className="text-main" />
              <h2 className="text-2xl font-medium">EduGenius</h2>
            </div>
            <p className="mt-2 text-center lg:mt-0 lg:pr-36 lg:text-left">
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
            <div className="flex w-full items-center overflow-hidden rounded-md border">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-transparent px-2 outline-none"
              />
              <button className="bg-main cursor-pointer rounded-tr-md px-5 py-3 text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="flex flex-col items-start px-5 md:flex-row md:gap-8 mt-10 lg:justify-between lg:p-0">
          <div className="">
            {/* Social Icons */}
            <div className="flex items-center gap-3 text-4xl">
              <Facebook
                size={35}
                className="dark:text-dark-bg text-main border cursor-pointer rounded shadow bg-light-bg  dark:bg-white  p-1.5"
              />
              <Twitter
                size={35}
                className="dark:text-dark-bg text-main border cursor-pointer rounded shadow bg-light-bg  dark:bg-white  p-1.5"
              />
              <Linkedin
                size={35}
                className="dark:text-dark-bg text-main border cursor-pointer rounded shadow bg-light-bg  dark:bg-white  p-1.5"
              />
              <Instagram
                size={35}
                className="dark:text-dark-bg text-main border cursor-pointer rounded shadow bg-light-bg  dark:bg-white  p-1.5"
              />
              <Youtube
                size={35}
                className="dark:text-dark-bg text-main border cursor-pointer rounded shadow bg-light-bg  dark:bg-white  p-1.5"
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
              <h2 className="mb-3 text-lg md:text-xl font-medium">Useful Links</h2>
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
              <h2 className="mb-3 text-lg md:text-xl font-medium">Resources</h2>
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
              <h2 className="mb-3 text-lg md:text-xl font-medium">Quick Links</h2>
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
        <hr/>
        {/* copyright section */}
        <p className="mt-5 text-center">
          Copyright @ 2025 All Rights Reserved to <Link className="text-dark-main dark:text-light-bg" href='/'>EduGenius</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
