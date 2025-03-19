import AllCourse from "@/components/shared/AllCourse";
import { getCourses } from "@/lib/actions/course.action";

export default async function Course({ searchParams }) {
  const category = searchParams.category; 
  const courses = await getCourses();
  return <AllCourse />;
}
