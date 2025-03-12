import Image from "next/image";

export default function InstructorCard({ instructor }) {
  return (
    <div className="shadow-md flex gap-4">
      <Image
        src={instructor.image}
        width={180}
        height={139}
        alt={instructor.name}
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold mt-4">{instructor.name}</h2>
        <p className="text-gray-600">{instructor.title}</p>
        <button className="bg-green-500 text-white py-2 px-4 rounded mt-4">
          Details
        </button>
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <a href={instructor.social.facebook} className="text-blue-600">
          f
        </a>
        <a href={instructor.social.twitter} className="text-blue-400">
          t
        </a>
        <a href={instructor.social.linkedin} className="text-blue-700">
          in
        </a>
        <a href={instructor.social.instagram} className="text-pink-500">
          ig
        </a>
      </div>
    </div>
  );
}
