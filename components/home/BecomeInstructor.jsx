import { ArrowRight } from "lucide-react"; // Or any other icon library you prefer
import Image from "next/image";
import Link from "next/link";

import { AvatarCircles } from "../magicui/avatar-circles";

const BecomeInstructor = () => {
  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgU8N0KsTxNyQZ8JNCeB1ckHusRLI1FUpqiA&s",
      profileUrl: "https://github.com/safethecode",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2",
      profileUrl: "https://github.com/sanjay-mali",
    },
  ];
  return (
    <section className="dark:to-dark-theme dark:from-dark-theme overflow-hidden bg-gradient-to-t px-5 pt-20 pb-10">
      <div className="container mx-auto lg:max-w-6xl">
        <div className="grid grid-cols-12 items-center">
          {/* Text Content */}
          <div className="col-span-12 md:col-span-7">
            <div>
              <h2 className="mb-2 text-4xl font-semibold">
                Share Your Expertise with the World
              </h2>
              <p className="dark:text-light-bg">
                Join our vibrant community of passionate instructors. Whether
                you&apos;re a seasoned expert or just getting started, you can teach
                what you love and impact learners globally.
              </p>
            </div>
            <p className="dark:text-medium-bg my-4 text-lg">
              Inspire the next generation. Earn as you share your skills and
              make a real difference—one course at a time.
            </p>

            <div className="flex gap-3 sm:gap-4">
              <Link
                href="/instructors"
                style={{ backgroundImage: "url('/star-blaze.gif')" }}
                className="border-green bg-main hover:bg-dark-main hover:text-medium-bg flex cursor-pointer items-center gap-2 rounded border px-3 py-2.5 text-white duration-200 md:px-6"
              >
                Start Teaching Today
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/about-us"
                className="hover:bg-light-bg flex cursor-pointer items-center gap-2 rounded border bg-white px-4 py-2.5 text-black shadow duration-200 md:px-6"
              >
                Learn more
              </Link>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm">
              <AvatarCircles numPeople={99} avatarUrls={avatars} />
              <span>Join 5,000+ instructors worldwide</span>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative col-span-12 mt-10 flex items-center justify-center md:col-span-5">
            {/* Gradient image behind instructor */}
            <Image
              className="animate-spin  absolute top-0 left-1/2 z-0 w-full max-w-[500px] -translate-x-1/2"
              src="/Hero-gradient-2.png"
              alt="Hero Gradient"
              width={500}
              height={500}
              style={{ animationDuration: "30s" }}
            />

            {/* Instructor image */}
            <Image
              src="/images/instructor.png"
              alt="Instructor teaching online"
              width={300}
              height={300}
              className="relative z-10 mx-auto w-full max-w-[300px] transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructor;
