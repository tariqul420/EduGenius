import { Rocket, User, Users, Video } from "lucide-react";
import Image from "next/image";

const data = [
  {
    icon: User,
    value: "9 +",
    title: "Teacher",
  },
  {
    icon: Video,
    value: "86 +",
    title: "Video",
  },
  {
    icon: Users,
    value: "357 +",
    title: "Student",
  },
  {
    icon: Rocket,
    value: "4,576,543 +",
    title: "App User",
  },
];

function OurAchieve() {
  return (
    <div className="container m-auto mt-20 flex flex-col gap-8 px-2 md:px-5 lg:max-w-6xl lg:flex-row lg:items-center">
      {/* Text Content */}
      <div className="flex-1 space-y-6 text-center lg:text-left">
        <h2 className="text-3xl font-bold lg:text-4xl">Our Achievement</h2>
        <p className="mx-auto max-w-lg text-sm text-gray-600 lg:mx-0 lg:text-base dark:text-gray-200">
          Your achievement is considered as our achievement. Whatever you learn
          from us, even if it’s a little – we will be proud to be a part of your
          journey.
        </p>
        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:gap-8">
          {data?.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-light-bg dark:bg-dark-bg flex flex-col items-center gap-4 rounded-md border px-2 py-5 text-center shadow md:flex-row md:text-left"
              >
                <div className="dark:bg-dark-hover flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-[#F4F5FF]">
                  <IconComponent className="text-main h-10 w-10" />
                </div>
                <div>
                  <p className="text-lg font-bold md:text-xl">{item?.value}</p>
                  <h6 className="font-medium text-gray-600 dark:text-gray-200">
                    {item?.title}
                  </h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Grid */}
      <div className="mx-auto mt-5 grid w-full grid-cols-2 gap-5 md:w-[600px]">
        <div className="relative col-span-1 h-[150px] md:h-[180px]">
          <Image
            src="/hero-image-2.jpeg"
            alt="Hero Image"
            fill
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="relative col-span-1 h-[150px] md:h-[180px]">
          <Image
            src="/hero-image-3.jpg"
            alt="Hero Image"
            fill
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="relative col-span-2 h-[200px] md:h-[250px]">
          <Image
            src="/hero-image-1.jpg"
            alt="Hero Image"
            fill
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default OurAchieve;
