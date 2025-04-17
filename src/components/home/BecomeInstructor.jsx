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
    <section className="bg-gradient-to-t pt-20 dark:from-black dark:to-dark-bg pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto lg:max-w-6xl">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          {/* Content */}
          <div className="">
            <div>
              <h2 className="text-4xl mb-2 font-medium">Share Your Knowledge</h2>
              <p className="dark:text-light-bg lg:w-4/6">Become a part of our growing community of expert instructors and share your knowledge with learners around the world. Inspire, teach, and make a difference—one course at a time.</p>
            </div>
            <p className="text-lg dark:text-medium-bg my-4 lg:w-7/8">
              Teach what you love and inspire the next generation of learners. 
              Earn while sharing your expertise with our global student community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="border-green bg-main hover:bg-dark-main hover:text-medium-bg flex cursor-pointer items-center gap-2 rounded border px-4 py-2.5 text-white duration-200 md:px-6">
                Start Teaching Today
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button className="bg-light-bg hover:bg-medium-bg cursor-pointer rounded border px-4 py-2.5 text-black duration-200 md:px-6">
                Learn More
              </button>
            </div>
            
            <div className="flex mt-5 items-center gap-2 text-sm">
            <AvatarCircles numPeople={99} avatarUrls={avatars} />
              <span>Join 5,000+ instructors worldwide</span>
            </div>
          </div>
          
          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/images/become_instructor.png"
                alt="Instructor teaching online"
                fill
                className="object-contain transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructor;