import { DataTable } from "@/components/data-table";
import { getCourses } from "@/lib/actions/course.action";
import { auth } from "@clerk/nextjs/server";

export default async function Courses() {
  const { sessionClaims } = await auth();
  const instructor = sessionClaims?.userId;
  if (!instructor) {
    throw new Error("User not authenticated");
  }
  const result = await getCourses({ instructor, limit: 10 });
  const courses = result?.courses || [];

  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <DataTable data={courses || []} />
      </div>
    </section>
  );
}
