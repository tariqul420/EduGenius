import Heading from "@/components/shared/Heading";
import {
  Atom,
  Beaker,
  BookOpen,
  Calculator,
  DollarSign,
  Globe,
  Paintbrush,
  Ruler,
} from "lucide-react";
import Link from "next/link";

const CourseSubjects = () => {
  const subjects = [
    {
      name: "Social Science",
      slug: "social-science",
      icon: BookOpen,
    },
    {
      name: "Chemistry",
      slug: "chemistry",
      icon: Beaker,
    },
    {
      name: "Economy",
      slug: "economy",
      icon: DollarSign,
    },
    {
      name: "Arts",
      slug: "arts",
      icon: Paintbrush,
    },
    {
      name: "General Knowledge",
      slug: "general-knowledge",
      icon: Globe,
    },
    {
      name: "Higher Math",
      slug: "higher-math",
      icon: Calculator,
    },
    {
      name: "Geometry",
      slug: "geometry",
      icon: Ruler,
    },
    {
      name: "Physics",
      slug: "physics",
      icon: Atom,
    },
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
        {subjects?.map((subject, index) => {
          const IconComponent = subject.icon;
          return (
            <Link
              href={`/courses?category=${subject?.slug}`}
              key={index}
              className="bg-light-bg dark:bg-dark-bg dark:bg-black-light flex transform cursor-pointer flex-col items-center rounded-lg border p-6 shadow transition-all duration-300 dark:border-t-[3px] dark:border-b-0 hover:scale-105 hover:shadow-md"
              role="button"
              aria-label={`Explore ${subject?.name} courses`}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center">
                <IconComponent className="text-main h-16 w-16" />
              </div>
              <p className="uppercase md:text-lg md:font-semibold">
                {subject?.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CourseSubjects;
