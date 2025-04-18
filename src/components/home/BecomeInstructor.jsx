import Heading from "@/components/shared/Heading";
import Image from "next/image";
import { ArrowRight } from "lucide-react"; // Or any other icon library you prefer
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
    <section className="dark:to-dark-bg bg-gradient-to-t px-4 pt-20 pb-16 sm:px-6 lg:px-8 dark:from-black">
  <div className="mx-auto lg:max-w-6xl">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Content */}
      <div>
        <div>
          <h2 className="mb-2 text-4xl font-medium">
            Share Your Knowledge
          </h2>
          <p className="dark:text-light-bg lg:w-4/6">
            Become a part of our growing community of expert instructors and
            share your knowledge with learners around the world. Inspire,
            teach, and make a difference—one course at a time.
          </p>
        </div>
        <p className="dark:text-medium-bg my-4 text-lg lg:w-7/8">
          Teach what you love and inspire the next generation of learners.
          Earn while sharing your expertise with our global student
          community.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button className="border-green bg-main hover:bg-dark-main hover:text-medium-bg flex cursor-pointer items-center gap-2 rounded border px-4 py-2.5 text-white duration-200 md:px-6">
            Start Teaching Today
            <ArrowRight className="h-4 w-4" />
          </button>

          <button className="bg-light-bg hover:bg-medium-bg cursor-pointer rounded border px-4 py-2.5 text-black duration-200 md:px-6">
            Learn More
          </button>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm">
          <AvatarCircles numPeople={99} avatarUrls={avatars} />
          <span>Join 5,000+ instructors worldwide</span>
        </div>
      </div>

      {/* Image */}
      <div className="relative flex overflow-hidden justify-center">
        <Image
          style={{ animationDuration: "30s" }}
          className="absolute -top-[50px] w-full min-w-[600px] animate-spin"
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
            className="w-full min-w-[300px] transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default BecomeInstructor;
