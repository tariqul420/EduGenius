import BecomeInstructor from "@/components/home/BecomeInstructor";
import CourseSubjects from "@/components/home/CourseSubjects";
import HeroSection from "@/components/home/HeroSection";
import PopularInsights from "@/components/home/PopularInsights";
import Testimonial from "@/components/home/Testimonial";
import TopCourses from "@/components/home/TopCourses";
import TopInstructors from "@/components/home/TopInstructors";
import TotalCourse from "@/components/home/TotalCourse";
import OurAchieve from "@/components/shared/OurAchieve";
import { getBlogs } from "@/lib/actions/blog.action";

export default async function Home({ searchParams }) {

  const { category } = await searchParams;

  const { blogs } = await getBlogs({ sort: "popular", limit: 3 });

  return (
    <div className="flex flex-col">
      <HeroSection />
      <TopCourses category={category} />
      <TotalCourse />
      <CourseSubjects />
      <TopInstructors />
      <OurAchieve />
      <PopularInsights blogs={blogs} />
      <BecomeInstructor />
      <Testimonial />
    </div>
  );
}
