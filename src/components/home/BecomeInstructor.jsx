import Image from "next/image";
import Heading from "@/components/shared/Heading";

const BecomeInstructor = () => {
  return (
    <section className="mt-10 px-10 py-12">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row lg:max-w-6xl">
        <div>
          <Heading
            title={`Become an Instructor`}
            subTitle={`Here you can become an Instructor`}
          />
          <div className="flex items-center justify-center">
            <button className="bg-main cursor-pointer px-6 py-3 font-semibold text-white hover:bg-zinc-700">
              Become Instructor
            </button>
          </div>
        </div>
        <div className="cursor-pointer transition-all duration-300 hover:-translate-y-2">
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
