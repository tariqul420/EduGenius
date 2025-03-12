"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { RiGraduationCapFill } from "react-icons/ri";
const Footer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#264D3F] to-dark-green text-white px-40 pt-40">
      {/* Top Section */}
      <div className="flex">
        {/* EduGenius & Description */}
        <div className="w-1/2">
          <div className="flex items-center gap-2 text-3xl">
            <RiGraduationCapFill className="text-green" />
            <h2 className="font-bold text-xl">EduGenius</h2>
          </div>
          <p className="w-[70%]">
            We are a forward-thinking software company dedicated to crafting
            digital experiences that seamlessly blend creativity with
            cutting-edge technology.
          </p>
        </div>
        {/* Subscribe Input Field */}
        <div className="w-1/2">
          <p className="mb-1 text-sm font-semibold">
            Subscribe Now To Get Special Features!
          </p>
          <div className="w-full flex items-center border border-gray-400 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-300 outline-none"
            />
            <button className="bg-green text-white font-semibold px-5 py-3 m-2 rounded-lg cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-32 flex items-center justify-between">
        <div>
          {/* Social Icons */}
          <div className="flex items-center gap-2 text-4xl">
            <FaFacebook className="bg-[#536961] hover:bg-green p-2 rounded-full"></FaFacebook>
            <FaTwitter className="bg-[#536961] hover:bg-green p-2 rounded-full"></FaTwitter>
            <FaLinkedin className="bg-[#536961] hover:bg-green p-2 rounded-full"></FaLinkedin>
            <FaInstagram className="bg-[#536961] hover:bg-green p-2 rounded-full"></FaInstagram>
            <FaYoutube className="bg-[#536961] hover:bg-green p-2 rounded-full"></FaYoutube>
          </div>

          <h3 className="font-bold mt-5">Download App</h3>

          {/* Download app  */}
          <div className="mt-5">
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
        <div className="flex justify-between items-center gap-52">
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
  );
};

export default Footer;
