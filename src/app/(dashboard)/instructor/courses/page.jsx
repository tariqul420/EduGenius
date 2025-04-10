import { DataTable } from "@/components/data-table";
import { getCourses } from "@/lib/actions/course.action";

export default async function Courses() {
  const result = await getCourses({ limit: 10 });

  const courses = result?.courses || [];

  return (
    <section className="py-6">
      <DataTable data={courses || []} />
    </section>
  );
}
