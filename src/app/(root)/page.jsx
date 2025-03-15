import BecomeInstructor from "@/components/home/BecomeInstructor";
import CategoryCards from "@/components/home/CategoryCards";
import CourseSubjects from "@/components/home/CourseSubjects";
import HeroSection from "@/components/home/HeroSection";
import TopInstructors from "@/components/home/TopInstructors";
import TotalCourse from "@/components/home/TotalCourse";
import OurAchieve from "@/components/shared/OurAchieve";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CategoryCards />
      <TotalCourse />
      <CourseSubjects />
      <TopInstructors />
      <OurAchieve />
      <BecomeInstructor />
    </div>
  );
}
