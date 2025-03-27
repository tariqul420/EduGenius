import Heading from "@/components/shared/Heading";
import Image from "next/image";
import Link from "next/link";

const CourseSubjects = () => {
  const subjects = [
    {
      name: "Social Science",
      slug: "social-science",
      image: "/images/social-science.png",
    },
    { name: "Chemistry", slug: "chemistry", image: "/images/chemistry.png" },
    { name: "Economy", slug: "economy", image: "/images/economy.png" },
    { name: "Arts", slug: "arts", image: "/images/arts.png" },
    {
      name: "General Knowledge",
      slug: "general-knowledge",
      image: "/images/general-knowledge.png",
    },
    {
      name: "Higher Math",
      slug: "higher-math",
      image: "/images/higher-math.png",
    },
    { name: "Geometry", slug: "geometry", image: "/images/geometry.png" },
    { name: "Chemistry", slug: "chemistry", image: "/images/chemistry.png" },
  ];

  return (
    <div className="container mx-auto px-2 py-5 md:px-5 md:py-8 lg:max-w-6xl">
      {/* Heading Section */}
      <Heading
        title={`Course By Subjects`}
        subTitle={`Find your desired course from a wide range of subjects.`}
      />

      {/* Subjects Grid */}
      <div className="grid grid-cols-2 gap-3 text-center sm:text-left md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {subjects?.map((subject, index) => (
          <Link
            href={`/courses?category=${subject?.slug}`}
            key={index}
            className="bg-light-bg dark:bg-dark-bg dark:bg-black-light flex transform cursor-pointer flex-col items-center rounded-lg p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
            role="button"
            aria-label={`Explore ${subject?.name} courses`}
          >
            <div className="relative mb-4 h-16 w-16">
              <Image
                src={subject?.image}
                alt={`${subject?.name} icon`}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-md"
              />
            </div>
            <p className="uppercase md:text-lg md:font-semibold">
              {subject.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseSubjects;
