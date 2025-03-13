import BecomeInstructor from "@/components/home/BecomeInstructor";
import CourseSubjects from "@/components/home/CourseSubjects";
import HeroSection from "@/components/home/HeroSection";
import TopInstructors from "@/components/home/TopInstructors";
import TotalCourse from "@/components/home/TotalCourse";

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
