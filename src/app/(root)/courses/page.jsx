import AllCourse from "@/components/shared/AllCourse";
import { getCourses } from "@/lib/actions/course.action";

export default async function Course(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.category || "";
  const courses = await getCourses({ search: "Advance" });
  return <AllCourse checkQuery={query} />;
}
