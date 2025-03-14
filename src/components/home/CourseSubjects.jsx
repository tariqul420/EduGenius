import Image from "next/image"; // Import Next.js Image component

const CourseSubjects = () => {
  // Array of subjects for cleaner code
  const subjects = [
    { name: "Social Science", image: "/social-science.png" },
    { name: "Chemistry", image: "/chemistry110.png" },
    { name: "Economy", image: "/economy.png" },
    { name: "Arts", image: "/arts.png" },
    { name: "General Knowledge", image: "/general-knowledge.png" },
    { name: "Higher Math", image: "/higher-math.png" },
    { name: "Geometry", image: "/geometry.png" },
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform cursor-pointer"
          >
            <div className="relative w-16 h-16 mb-4">
              <Image
                src={subject.image}
                alt={subject.name}
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
            </div>
            <p className="text-lg font-semibold text-gray-800 uppercase">
              {subject.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSubjects;