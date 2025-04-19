import {
  getCourseAdminInstructor,
  getCourses,
} from "@/lib/actions/course.action";

export default async function CourseAdmin({ searchParams }) {
  const { pageSize, pageIndex, search } = await searchParams;

  const { courses = [], pagination } = await getCourseAdminInstructor({
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
    search,
  });

  const data = await getCourses();

  console.log(data);

  console.log(courses, pagination);

  return <div>CourseAdmin</div>;
}
