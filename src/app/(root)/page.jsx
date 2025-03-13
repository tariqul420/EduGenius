import HeroSection from "@/components/home/HeroSection";

import TotalCourse from "@/components/home/TotalCourse";
import CourseSubjects from "@/components/home/CourseSubjects";
import BecomeInstructor from "@/components/home/BecomeInstructor";
import TopInstructors from "@/components/home/TopInstructors";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TopInstructors />
      <BecomeInstructor />
      <TotalCourse />
      <CourseSubjects />
    </div>
  );
}
