import BecomeInstructor from "@/components/home/BecomeInstructor";
import CourseSubjects from "@/components/home/CourseSubjects";
import HeroSection from "@/components/home/HeroSection";
import PopularInsights from "@/components/home/PopularInsights";
import Testimonial from "@/components/home/Testimonial";
import TopCourses from "@/components/home/TopCourses";
import TopInstructors from "@/components/home/TopInstructors";
import TotalCourse from "@/components/home/TotalCourse";
import OurAchieve from "@/components/shared/OurAchieve";

export default async function Home({ searchParams }) {

  const { category } = await searchParams;

  return (
    <div className="flex flex-col">
      <HeroSection />
      <TopCourses category={category} />
      <TotalCourse />
      <CourseSubjects />
      <TopInstructors />
      <OurAchieve />
      <PopularInsights />
      <BecomeInstructor />
      <Testimonial />
    </div>
  );
}
