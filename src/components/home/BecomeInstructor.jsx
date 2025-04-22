import { ArrowRight } from "lucide-react"; // Or any other icon library you prefer
import Image from "next/image";

import { AvatarCircles } from "../magicui/avatar-circles";

const BecomeInstructor = () => {
  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59228569",
      profileUrl: "https://github.com/safethecode",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59442788",
      profileUrl: "https://github.com/sanjay-mali",
    },
  ];
  return (
    <section className="dark:to-dark-theme overflow-hidden bg-gradient-to-t px-2 pt-20 pb-16 md:px-5 dark:from-dark-bg">
      <div className="mx-auto lg:max-w-6xl">
        <div className="grid grid-cols-12 items-center">
          {/* Content */}
          <div className="col-span-12 md:col-span-7">
            <div>
              <h2 className="mb-2 text-4xl font-medium">
                Share Your Knowledge
              </h2>
              <p className="dark:text-light-bg">
                Become a part of our growing community of expert instructors and
                share your knowledge with learners around the world. Inspire,
                teach, and make a difference—one course at a time.
              </p>
            </div>
            <p className="dark:text-medium-bg my-4 text-lg">
              Teach what you love and inspire the next generation of learners.
              Earn while sharing your expertise with our global student
              community.
            </p>

            <div className="flex gap-3 sm:gap-4">
              <button className="border-green bg-main hover:bg-dark-main hover:text-medium-bg flex cursor-pointer items-center gap-2 rounded border px-3 py-2.5 text-white duration-200 md:px-6">
                Start Teaching Today
                <ArrowRight className="h-4 w-4" />
              </button>

              <button className="bg-light-bg hover:bg-medium-bg cursor-pointer rounded border px-3 py-2.5 text-black duration-200 md:px-6">
                Learn More
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm">
              <AvatarCircles numPeople={99} avatarUrls={avatars} />
              <span>Join 5,000+ instructors worldwide</span>
            </div>
          </div>
          {/* Image */}
          <div className="relative col-span-12 mt-8 md:col-span-5">
            <Image
              style={{ animationDuration: "30s" }}
              className="absolute -top-[50px] left-0 z-[1] w-full min-w-[500px] animate-spin"
              width={100}
              height={100}
              alt="Hero_Gradient"
              src="/Hero-gradient-2.png"
            />
            <div>
              <Image
                src="/images/instructor.png"
                alt="Instructor teaching online"
                width={180}
                height={180}
                className="z-[2] mx-auto w-full max-w-[300px] transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructor;
