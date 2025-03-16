import Image from "next/image";
import Heading from "@/components/shared/Heading"

const BecomeInstructor = () => {
  return (
    <section className="py-12 px-10 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between container mx-auto lg:max-w-6xl">
        <div>
          <Heading title={`Become an Instructor`} subTitle={`Here you can become an Instructor`} />
          <div className="flex justify-center items-center">
            <button className="cursor-pointer px-6 py-3 bg-green text-white font-semibold hover:bg-zinc-700">
              Become Instructor
            </button>
          </div>
        </div>
        <div className="transition-all duration-300 hover:-translate-y-2 cursor-pointer">
          <Image
            src="/images/become_instructor.png"
            width={500}
            height={500}
            alt="become an instructor"
          />
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructor;
