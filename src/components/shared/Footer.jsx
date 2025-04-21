import {
  Facebook,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

const SocialIcon = [
  { icon: Facebook, link: "https://www.facebook.com" },
  { icon: Twitter, link: "https://x.com" },
  { icon: Linkedin, link: "https://www.linkedin.com" },
  { icon: Instagram, link: "https://www.instagram.com" },
  { icon: Youtube, link: "https://www.youtube.com" },
  { icon: Github, link: "https://github.com/tariqul420/EduGenius" },
];

const Footer = () => {
  return (
    <footer className="dark:to-dark-bg dark:from-dark-bg dark:text-light-bg border-t bg-gradient-to-r py-5 px-2 md:px-5 text-black md:py-10">
      <div className="container mx-auto lg:max-w-6xl ">
        {/* Top Section */}
        <div className="flex flex-col px-2 md:px-5 lg:flex-row lg:px-0">
          {/* EduGenius & Description */}
          <div className="lg:w-1/2">
            <div className="flex items-center justify-center gap-2 text-3xl lg:justify-start">
              <GraduationCap className="text-main" />
              <h2 className="text-2xl font-semibold">Edu<span className="text-main">Genius</span></h2>
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
        <div className="mt-10 flex flex-col items-start px-1.5 md:px-5 md:flex-row md:gap-8 lg:justify-between lg:p-0">
          <div className="">
            {/* Social Icons */}
            <div className="flex items-center gap-3 text-4xl">
              {SocialIcon?.map((item, index) => (
                <a
                  key={index}
                  href={item?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon
                    size={34}
                    className="bg-light-bg shadow text-dark-main dark:bg-gradient-to-b dark:from-dark-hover dark:to-dark-bg rounded p-1.5"
                  />
                </a>
              ))}
            </div>

            <h3 className="mt-5 mb-5 font-bold">Download App</h3>

            {/* Download app */}
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
              <h2 className="mb-3 text-lg font-medium md:text-xl">
                Useful Links
              </h2>
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
              <h2 className="mb-3 text-lg font-medium md:text-xl">Resources</h2>
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
              <h2 className="mb-3 text-lg font-medium md:text-xl">
                Quick Links
              </h2>
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
        <hr />
        {/* copyright section */}
        <p className="mt-5 text-center">
          Copyright @ {new Date().getFullYear()} All Rights Reserved to{" "}
          <Link className="text-dark-main dark:text-light-bg" href="/">
            EduGenius
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
