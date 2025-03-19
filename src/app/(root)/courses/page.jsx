import AllCourse from "@/components/shared/AllCourse";
import CourseCard from "@/components/shared/CourseCard";
import { getCourses } from "@/lib/actions/course.action";

export default async function Course({ searchParams }) {
  const category = searchParams?.category || "";
  const { courses } = await getCourses();
  return (
    <AllCourse>
      {courses &&
        courses.length > 0 &&
        courses.map((course) => (
          <div
            key={course._id}
            className={`min-h-[200px] flex-col rounded shadow-md sm:col-span-1`}
          >
            <CourseCard  course={course} />
          </div>
        ))}
    </AllCourse>
  );
}
