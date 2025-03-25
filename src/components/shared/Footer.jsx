"use client";
import { Facebook, GraduationCap, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#264D3F] to-dark-green text-white py-12">
      <div className="container lg:max-w-6xl m-auto">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row px-5 lg:px-0">
          {/* EduGenius & Description */}
          <div className="lg:w-1/2">
            <div className="flex items-center lg:justify-start justify-center gap-2 text-3xl">
              <GraduationCap className="text-primary" />
              <h2 className="font-bold text-xl">EduGenius</h2>
            </div>
            <p className="lg:w-[70%] text-center lg:text-left lg:mt-0 mt-2">
              We are a forward-thinking software company dedicated to crafting
              digital experiences that seamlessly blend creativity with
              cutting-edge technology.
            </p>
          </div>
          {/* Subscribe Input Field */}
          <div className="lg:w-1/2 lg:mt-0 mt-10">
            <p className="mb-1 text-sm font-semibold">
              Subscribe Now To Get Special Features!
            </p>
            <div className="w-full flex items-center border border-gray-400 rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-300 outline-none"
              />
              <button className="bg-primary text-white font-semibold px-5 py-3 m-2 rounded-lg cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="lg:mt-32 mt-14 flex items-start flex-col md:flex-row lg:justify-between md:gap-8 px-5 lg:p-0">
          <div className="">
            {/* Social Icons */}
            <div className="flex items-center gap-2 text-4xl">
              <Facebook size={35} className="bg-[#536961] hover:bg-primary p-2 rounded-full cursor-pointer" />
              <Twitter size={35} className="bg-[#536961] hover:bg-primary p-2 rounded-full cursor-pointer" />
              <Linkedin size={35} className="bg-[#536961] hover:bg-primary p-2 rounded-full cursor-pointer" />
              <Instagram size={35} className="bg-[#536961] hover:bg-primary p-2 rounded-full cursor-pointer" />
              <Youtube size={35} className="bg-[#536961] hover:bg-primary p-2 rounded-full cursor-pointer" />
            </div>

            <h3 className="font-bold mb-5 mt-5">Download App</h3>

            {/* Download app  */}
            <div className="mb-10">
              <h3>Download our apps in play store and app store</h3>
              <div className="flex gap-5 mt-3">
                <Link href="https://play.google.com/store">
                  Google Play Store
                </Link>
                <Link href="https://www.apple.com/app-store/">
                  Apple App Store
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center lg:flex-row lg:gap-32 gap-7">
            {/* Different types of links */}
            <div className="flex flex-col">
              <h2 className="font-bold mb-3">Useful Links</h2>
              <Link className="cursor-pointer mb-1" href="/aboutUs">
                About Us
              </Link>
              <Link className="cursor-pointer mb-1" href="/refund">
                Refund Policy
              </Link>
              <Link className="cursor-pointer mb-1" href="/faq">
                FAQ
              </Link>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold mb-3">Resources</h2>
              <Link className="cursor-pointer mb-1" href="/contactUs">
                Contact Us
              </Link>
              <Link className="cursor-pointer mb-1" href="/joinInstructor">
                Join as Instructor
              </Link>
              <Link className="cursor-pointer mb-1" href="/aboutUs">
                Blog
              </Link>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold mb-3">Quick Links</h2>
              <Link className="cursor-pointer mb-1" href="/store">
                Book Store
              </Link>
              <Link className="cursor-pointer mb-1" href="/offer">
                Available Offer
              </Link>
              <Link className="cursor-pointer mb-1" href="/courses">
                Popular Courses
              </Link>
            </div>
          </div>
        </div>
        <hr className="mt-16 text-gray-500" />
        {/* copyright section */}
        <p className="text-center mt-8">
          Copyright @ 2025 All Rights Reserved to EduGenius
        </p>
      </div>
    </footer>
  );
};

export default Footer;
