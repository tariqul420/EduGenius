import { DataTable } from "@/components/data-table";
import { getCourses } from "@/lib/actions/course.action";
import { auth } from "@clerk/nextjs/server";

export default async function Courses({ searchParams }) {
  const { pageSize, pageIndex } = await searchParams;

  const { sessionClaims } = await auth();
  const instructor = sessionClaims?.userId;
  if (!instructor) {
    throw new Error("User not authenticated");
  }

  const result = await getCourses({
    instructor,
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
  });
  const courses = result?.courses || [];

  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <DataTable
          pageIndex={Number(pageIndex || "0")}
          pageSize={Number(pageSize || "10")}
          total={result?.total || 0}
          data={courses || []}
        />
      </div>
    </section>
  );
}
