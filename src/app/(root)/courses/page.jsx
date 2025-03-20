import AllCourse from "@/components/shared/AllCourse";
import CourseCard from "@/components/shared/CourseCard";
import { getCourses } from "@/lib/actions/course.action";

export default async function Course({ searchParams }) {
  const category = searchParams?.category || "";
  const { courses } = await getCourses();
  return (
    <AllCourse>
      {courses?.map((course) => (
          <CourseCard key={course._id}  course={course} />
        ))}
    </AllCourse>
  );
}
