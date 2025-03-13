import Image from "next/image";

const BecomeInstructor = () => {
  return (
    <section className="bg-[#f8f8f8] py-12 px-10">
      <div className="flex flex-col md:flex-row items-center justify-between container mx-auto lg:max-w-6xl">
        <div>
          <h1 className="font-bold lg:text-2xl text-xl lg:text-left text-center">
            Become an Instructor
          </h1>
          <p className="text-gray-500 lg:mb-6 mb-3 text-sm lg:text-left text-center">
            Here you can become an Instructor
          </p>
          <div className="flex justify-center items-center">
            <button className="cursor-pointer px-6 py-3 bg-green text-white font-semibold hover:bg-zinc-700">
              Become Instructor
            </button>
          </div>
        </div>
        <div>
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
