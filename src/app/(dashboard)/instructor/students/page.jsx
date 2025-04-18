import DataTable from "@/components/dashboard/data-table";
import { instructorStudentColumns } from "@/constant/columns";
import { getStudents } from "@/lib/actions/instructor.action";
import { auth } from "@clerk/nextjs/server";

export default async function Student({ searchParams }) {
  const { pageSize, pageIndex, search } = await searchParams;

  const { sessionClaims } = await auth();
  const instructor = sessionClaims?.userId;
  if (!instructor) {
    throw new Error("User not authenticated");
  }

  const { students, pagination } = await getStudents({
    instructorId: instructor,
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
    search,
  });

  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
        <DataTable
          pageIndex={Number(pageIndex || "1")}
          pageSize={Number(pageSize || "10")}
          total={pagination?.totalItems || 0}
          data={students || []}
          columns={instructorStudentColumns || []}
          uniqueIdProperty="studentId"
        />
      </div>
    </section>
  );
}
