import Image from "next/image";

const BecomeInstructor = () => {
  return (
    <div className="flex items-center justify-between bg-[#f8f8f8] px-40">
      <div>
        <h1 className="font-bold text-2xl">Become an Instructor</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Here you can become an Instructor
        </p>
        <button className="cursor-pointer px-6 py-3 bg-green text-white font-semibold hover:bg-zinc-700">
          Become Instructor
        </button>
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
  );
};

export default BecomeInstructor;
