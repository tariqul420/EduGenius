// import {
//   Atom,
//   Beaker,
//   BookOpen,
//   Calculator,
//   DollarSign,
//   Globe,
//   Paintbrush,
//   Ruler,
// } from "lucide-react";

import { OrbitingCirclesDemo } from "./OrbitingCirclesDemo";
import { MarqueeDemoVertical } from "./VerticalMarquee";

import Heading from "@/components/shared/Heading";

const CourseSubjects = () => {
  // const subjects = [
  //   {
  //     name: "Social Science",
  //     slug: "social-science",
  //     icon: BookOpen,
  //   },
  //   {
  //     name: "Chemistry",
  //     slug: "chemistry",
  //     icon: Beaker,
  //   },
  //   {
  //     name: "Economy",
  //     slug: "economy",
  //     icon: DollarSign,
  //   },
  //   {
  //     name: "Arts",
  //     slug: "arts",
  //     icon: Paintbrush,
  //   },
  //   {
  //     name: "General Knowledge",
  //     slug: "general-knowledge",
  //     icon: Globe,
  //   },
  //   {
  //     name: "Higher Math",
  //     slug: "higher-math",
  //     icon: Calculator,
  //   },
  //   {
  //     name: "Geometry",
  //     slug: "geometry",
  //     icon: Ruler,
  //   },
  //   {
  //     name: "Physics",
  //     slug: "physics",
  //     icon: Atom,
  //   },
  // ];

  return (
    <div className="container mx-auto px-2 py-5 md:px-5 md:py-8 lg:max-w-6xl">
      {/* Heading Section */}
      <Heading
        title={"Course By Subjects"}
        subTitle={"Find your desired course from a wide range of subjects."}
      />

      <div className="flex items-center justify-center gap-5 md:gap-8">
        <div className="left-content min-h-[700px] w-full">
          <MarqueeDemoVertical />
        </div>
        <div className="right-content min-h-[440px] w-full">
          <OrbitingCirclesDemo />
        </div>
      </div>
      {/* <div className="grid grid-cols-2 gap-3 text-center sm:text-left md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {subjects?.map((subject, index) => {
          const IconComponent = subject.icon;
          return (
            <Link
              href={`/courses?category=${subject?.slug}`}
              key={index}
              className="bg-light-bg dark:bg-dark-bg dark:bg-black-light flex transform cursor-pointer flex-col items-center rounded-lg border p-6 shadow transition-all duration-300 hover:scale-105 hover:shadow-md dark:border-t-[3px] dark:border-b-0"
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
      </div> */}
    </div>
  );
};

export default CourseSubjects;
