import Image from "next/image";
import Link from "next/link";

const CourseSubjects = () => {
  const subjects = [
    { name: "Social Science", image: "/images/social-science.png" },
    { name: "Chemistry", image: "/images/chemistry.png" },
    { name: "Economy", image: "/images/economy.png" },
    { name: "Arts", image: "/images/arts.png" },
    { name: "General Knowledge", image: "/images/general-knowledge.png" },
    { name: "Higher Math", image: "/images/higher-math.png" },
    { name: "Geometry", image: "/images/geometry.png" },
  ];

  return (
    <div className="mt-20 container mx-auto lg:max-w-6xl">
      {/* Heading Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Course By Subjects</h1>
        <p className="mt-2 text-lg text-gray-600">
          Find your desired course from a wide range of subjects.
        </p>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subjects?.map((subject, index) => (
          <Link
          href={`/subject/${subject?.name}`}
            key={index}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform cursor-pointer"
            role="button"
            aria-label={`Explore ${subject?.name} courses`}
          >
            <div className="relative w-16 h-16 mb-4">
              <Image
                src={subject?.image}
                alt={`${subject?.name} icon`}
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
            </div>
            <p className="text-lg font-semibold text-gray-800 uppercase">
              {subject.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseSubjects;