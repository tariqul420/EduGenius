import OrbitingCircle from "./orbiting-circle";
import VerticalMarquee from "./vertical-marquee";

import Heading from "@/components/shared/heading";

const CourseSubjects = () => {
  return (
    <div className="container mx-auto px-2 py-5 md:px-5 md:py-8 lg:max-w-6xl">
      {/* Heading Section */}
      <Heading
        badge={"Skill Library"}
        title={"Explore Our Courses"}
        subTitle={
          "100+ courses across tech and creative disciplines\nFrom beginner fundamentals to advanced specializations"
        }
      />

      <div className="flex flex-col items-center justify-center gap-5 md:gap-8 lg:flex-row">
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
