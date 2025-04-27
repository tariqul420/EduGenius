import { Rocket, ShieldUser, Users, Video } from "lucide-react";
import Image from "next/image";

const data = [
  {
    icon: ShieldUser,
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
    <section className="dark:from-dark-bg dark:to-dark-theme bg-gradient-to-b">
      <div className="container mx-auto mb-16 flex flex-col gap-8 px-2 md:px-5 lg:max-w-6xl lg:flex-row lg:items-center">
        {/* Text Content */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <h2 className="text-3xl font-bold lg:text-4xl">Our Achievement</h2>
          <p className="mx-auto max-w-lg text-sm text-gray-600 lg:mx-0 lg:text-base dark:text-gray-200">
            Your achievement is considered as our achievement. Whatever you
            learn from us, even if it’s a little – we will be proud to be a part
            of your journey.
          </p>
          <div className="grid grid-cols-2 gap-3 md:gap-5 lg:gap-8">
            {data?.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="dark:bg-dark-bg flex flex-col items-center gap-4 rounded-md border bg-white px-2 py-5 text-center shadow md:flex-row md:text-left dark:border-t-[3px] dark:border-b-0"
                >
                  <div className="dark:from-dark-hover to-dark-bg bg-main/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md border dark:bg-gradient-to-b dark:shadow">
                    <IconComponent className="text-main h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-bold md:text-xl">
                      {item?.value}
                    </p>
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
        <div className="mx-auto mt-5 grid w-full grid-cols-2 gap-5 px-3 sm:px-0 lg:w-[600px]">
          <div className="relative col-span-1 h-[150px] md:h-[180px]">
            <Image
              src="/our-achievements-1.avif"
              alt="Hero Image"
              fill
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="relative col-span-1 h-[150px] md:h-[180px]">
            <Image
              src="/our-achievements-2.jpg"
              alt="Hero Image"
              fill
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="relative col-span-2 h-[200px] md:h-[250px]">
            <Image
              src="/our-achievements-3.jpg"
              alt="Hero Image"
              fill
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurAchieve;
