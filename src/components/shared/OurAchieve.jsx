import Image from 'next/image';
import Heading from "@/components/shared/Heading"

const data = [
  {
    img: "https://faculty.spagreen.net/demo/public/frontend/img/icons/user-2.svg",
    value: "9 +",
    title: "Teacher"
  },
  {
    img: "https://faculty.spagreen.net/demo/public/frontend/img/icons/live-streaming.svg",
    value: "86 +",
    title: "Video"
  },
  {
    img: "https://faculty.spagreen.net/demo/public/frontend/img/icons/user-3.svg",
    value: "357 +",
    title: "Student"
  },
  {
    img: "https://faculty.spagreen.net/demo/public/frontend/img/icons/rocket.svg",
    value: "4,576,543 +",
    title: "App User"
  },
];

function OurAchieve() {
  return (
    <div className='container m-auto lg:max-w-6xl flex flex-col lg:flex-row gap-8 mt-20 px-4'>
      {/* Text Content */}
      <div className='space-y-6 flex-1 text-center lg:text-left'>
        <h2 className="font-bold text-3xl lg:text-4xl">Our Achievement</h2>
        <p className="text-sm lg:text-base text-gray-600 dark:text-gray-200 max-w-lg mx-auto lg:mx-0">
          Your achievement is considered as our achievement. Whatever you learn from us, even if it’s a little – we will be proud to be a part of your journey.
        </p>
        <div className='grid grid-cols-2 gap-6 lg:gap-8'>
          {data?.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <div className='relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0'>
                <Image
                  src={item?.img}
                  alt={item?.title}
                  fill
                  className='object-contain p-2'
                  placeholder='blur'
                  blurDataURL={item?.img}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <p className="text-lg md:text-xl font-bold">{item?.value}</p>
                <h6 className="font-medium text-gray-600 dark:text-gray-200">{item?.title}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className='flex-1 w-full grid grid-cols-2 gap-4'>
        <div className='relative h-48 sm:h-64 rounded-lg shadow-lg overflow-hidden'>
          <Image
            src="/images/achievement1.png"
            alt="Achievement 1"
            fill
            className='object-cover'
            placeholder='blur'
            blurDataURL='/images/achievement1.png'
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className='relative h-48 sm:h-64 rounded-lg shadow-lg overflow-hidden bg-[#333333] dark:bg-black-light flex items-center justify-center'>
        </div>

        <div className='relative h-48 sm:h-64 rounded-lg shadow-lg overflow-hidden bg-primary dark:bg-black-light flex items-center justify-center'>
        </div>

        <div className='relative h-48 sm:h-64 rounded-lg shadow-lg overflow-hidden'>
          <Image
            src="/images/achievement2.jpeg"
            alt="Achievement 2"
            fill
            className='object-cover'
            placeholder='blur'
            blurDataURL='/images/achievement2.jpeg'
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}

export default OurAchieve;