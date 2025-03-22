import Heading from "@/components/shared/Heading";
import Image from "next/image";
import Link from "next/link";

const CourseSubjects = () => {
  const subjects = [
    { name: "Social Science", slug: "social-science", image: "/images/social-science.png" },
    { name: "Chemistry", slug: "chemistry", image: "/images/chemistry.png" },
    { name: "Economy", slug: "economy", image: "/images/economy.png" },
    { name: "Arts", slug: "arts", image: "/images/arts.png" },
    { name: "General Knowledge", slug: "general-knowledge", image: "/images/general-knowledge.png" },
    { name: "Higher Math", slug: "higher-math", image: "/images/higher-math.png" },
    { name: "Geometry", slug: "geometry", image: "/images/geometry.png" },
    { name: "Chemistry", slug: "chemistry", image: "/images/chemistry.png" },
  ];

  return (
    <div className="mt-20 container mx-auto lg:max-w-6xl">
      {/* Heading Section */}
      <Heading title={`Course By Subjects`} subTitle={`Find your desired course from a wide range of subjects.`} />

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subjects?.map((subject, index) => (
          <Link
            href={`/courses?category=${subject?.slug}`}
            key={index}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform cursor-pointer dark:bg-black-light"
            role="button"
            aria-label={`Explore ${subject?.name} courses`}
          >
            <div className="relative w-16 h-16 mb-4">
              <Image
                src={subject?.image}
                alt={`${subject?.name} icon`}
                fill
                style={{ objectFit: 'contain' }}
                className="rounded-md"
              />
            </div>
            <p className="text-lg font-semibold uppercase">
              {subject.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseSubjects;