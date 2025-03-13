import HeroSection from "@/components/home/HeroSection";
import BecomeInstructor from "../../components/home/BecomeInstructor";
import TopInstructors from "../../components/home/TopInstructors";
import TotalCourse from "@/components/home/TotalCourse";
import CourseSubjects from "@/components/home/CourseSubjects";

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
