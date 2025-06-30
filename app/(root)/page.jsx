import BecomeInstructor from "@/components/home/become-instructor";
import CourseSubjects from "@/components/home/course-subjects";
import HeroSection from "@/components/home/hero-section";
import PopularInsights from "@/components/home/popular-insights";
import Testimonial from "@/components/home/testimonial";
import TopCourses from "@/components/home/top-courses";
import TopInstructors from "@/components/home/top-instructors";
import TotalCourse from "@/components/home/total-course";
import OurAchieve from "@/components/shared/OurAchieve";
import { getBlogs } from "@/lib/actions/blog.action";
import { getCategory } from "@/lib/actions/category.action";
import { getCourses } from "@/lib/actions/course.action";
import { getInstructors } from "@/lib/actions/instructor.action";

export default async function Home({ searchParams }) {
  const { category } = await searchParams;
  // If category then get the category slug
  const categoryParams = category ? category.split(",") : [];

  const { blogs } = await getBlogs({ sort: "popular", limit: 3 });

  const { courses } = await getCourses({
    categorySlugs: categoryParams,
    limit: 6,
    sort: "top-rated",
  });

  const { instructors: bestInstructors = [] } = await getInstructors({
    limit: 6,
  });

  const categories = await getCategory();

  return (
    <div className="flex flex-col">
      <HeroSection />
      <TopCourses courses={courses} categories={categories} />
      <TotalCourse />
      <CourseSubjects />
      <TopInstructors bestInstructors={bestInstructors} />
      <OurAchieve />
      <PopularInsights blogs={blogs} />
      <BecomeInstructor />
      <Testimonial />
    </div>
  );
}
