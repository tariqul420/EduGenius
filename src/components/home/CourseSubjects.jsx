import OrbitingCircle from "./OrbitingCircle";
import VerticalMarquee from "./VerticalMarquee";

import Heading from "@/components/shared/Heading";

const CourseSubjects = () => {
  return (
    <div className="container mx-auto px-2 py-5 md:px-5 md:py-8 lg:max-w-6xl">
      {/* Heading Section */}
      <Heading
        title={"Course By Subjects"}
        subTitle={"Find your desired course from a wide range of subjects."}
      />

      <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-8">
        <div className="left-content min-h-[400px] w-full">
          <VerticalMarquee />
        </div>
        <div className="right-content min-h-[400px] w-full">
          <OrbitingCircle />
        </div>
      </div>
    </div>
  );
};

export default CourseSubjects;
