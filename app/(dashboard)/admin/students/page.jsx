import DataTable from "@/components/dashboard/data-table";
import { adminStudentColumns } from "@/components/dashboard/table-columns";
import { getStudents } from "@/lib/actions/student.action";

export default async function AdminStudents({ searchParams }) {
  const { pageSize, pageIndex, search } = await searchParams;

  const { students, pagination } = await getStudents({
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
    search: search?.trim(),
  });

  return (
    <section className="@container/main flex flex-1 flex-col gap-2 px-4 py-6 lg:px-6">
      <DataTable
        pageIndex={Number(pageIndex || "1")}
        pageSize={Number(pageSize || "10")}
        total={pagination?.totalItems || 0}
        data={students || []}
        columns={adminStudentColumns || []}
        uniqueIdProperty="_id"
      />
    </section>
  );
}
