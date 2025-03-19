import AllCourse from "@/components/shared/AllCourse";
import { getCourses } from "@/lib/actions/course.action";

export default async function Course() {
  const courses = await getCourses({ search: "Advance" });

  return <AllCourse />;
}
