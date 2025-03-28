import Image from "next/image";
import Heading from "@/components/shared/Heading";

const data = [
  {
    img: "https://faculty.spagreen.net/demo/public/frontend/img/icons/user-2.svg",
    value: "9 +",
    title: "Teacher",
  },
  {
    img: "https://faculty.spagreen.net/demo/public/frontend/img/icons/live-streaming.svg",
    value: "86 +",
    title: "Video",
  },
  {
    img: "https://faculty.spagreen.net/demo/public/frontend/img/icons/user-3.svg",
    value: "357 +",
    title: "Student",
  },
  {
    img: "https://faculty.spagreen.net/demo/public/frontend/img/icons/rocket.svg",
    value: "4,576,543 +",
    title: "App User",
  },
];

function OurAchieve() {
  return (
    <div className="container m-auto mt-20 flex flex-col gap-8 px-4 lg:max-w-6xl lg:flex-row">
      {/* Text Content */}
      <div className="flex-1 space-y-6 text-center lg:text-left">
        <h2 className="text-3xl font-bold lg:text-4xl">Our Achievement</h2>
        <p className="mx-auto max-w-lg text-sm text-gray-600 lg:mx-0 lg:text-base dark:text-gray-200">
          Your achievement is considered as our achievement. Whatever you learn
          from us, even if it’s a little – we will be proud to be a part of your
          journey.
        </p>
        <div className="grid grid-cols-2 gap-6 lg:gap-8">
          {data?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-light-bg dark:bg-dark-bg rounded-md px-2 shadow border py-5 items-center gap-4 text-center md:flex-row md:text-left"
            >
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={item?.img}
                  alt={item?.title}
                  fill
                  className="object-contain p-2"
                  placeholder="blur"
                  blurDataURL={item?.img}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <p className="text-lg font-bold md:text-xl">{item?.value}</p>
                <h6 className="font-medium text-gray-600 dark:text-gray-200">
                  {item?.title}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid w-full flex-1 grid-cols-2 gap-4">
        <div className="relative h-48 overflow-hidden rounded-lg shadow-lg sm:h-64">
          <Image
            src="/images/achievement1.png"
            alt="Achievement 1"
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="/images/achievement1.png"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="dark:bg-black-light relative flex h-48 items-center justify-center overflow-hidden rounded-lg bg-[#333333] shadow-lg sm:h-64"></div>

        <div className="bg-main dark:bg-black-light relative flex h-48 items-center justify-center overflow-hidden rounded-lg shadow-lg sm:h-64">

        </div>

        <div className="relative h-48 overflow-hidden rounded-lg shadow-lg sm:h-64">
          <Image
            src="/images/achievement2.jpeg"
            alt="Achievement 2"
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="/images/achievement2.jpeg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}

export default OurAchieve;
