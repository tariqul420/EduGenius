import { auth } from "@clerk/nextjs/server";

import DataTable from "@/components/dashboard/data-table";
import { adminCourseColumns } from "@/components/dashboard/table-columns";
import { getCourseAdminInstructor } from "@/lib/actions/course.action";

export default async function Courses({ searchParams }) {
  const { pageSize, pageIndex, search } = await searchParams;

  const { sessionClaims } = await auth();
  const instructor = sessionClaims?.userId;
  if (!instructor) {
    throw new Error("User not authenticated");
  }

  const { courses, pagination } = await getCourseAdminInstructor({
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
    search: search?.trim(),
  });

  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
        <DataTable
          pageIndex={Number(pageIndex || "1")}
          pageSize={Number(pageSize || "10")}
          total={pagination?.totalItems || 0}
          data={courses || []}
          columns={adminCourseColumns || []}
          uniqueIdProperty="_id"
        />
      </div>
    </section>
  );
}
