import BecomeInstructor from "@/components/home/BecomeInstructor";
import CourseSubjects from "@/components/home/CourseSubjects";
import HeroSection from "@/components/home/HeroSection";
import TopInstructors from "@/components/home/TopInstructors";
import TotalCourse from "@/components/home/TotalCourse";
import OurAchieve from "@/components/shared/OurAchieve";
import Testimonial from "@/components/shared/Testimonial";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TotalCourse />
      <CourseSubjects />
      <TopInstructors />
      <OurAchieve />
      <BecomeInstructor />
      <Testimonial />
    </div>
  );
}
