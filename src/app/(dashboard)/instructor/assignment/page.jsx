import DataTable from "@/components/dashboard/data-table";
import { instructorAssignmentColumns } from "@/constant/columns";
import { getAssignment } from "@/lib/actions/assignment.action";

export default async function Assignment({ searchParams }) {
  const { pageSize, pageIndex, search } = await searchParams;

  const { assignments, pagination } = await getAssignment({
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
          data={assignments || []}
          columns={instructorAssignmentColumns || []}
          uniqueIdProperty="_id"
        />
      </div>
    </section>
  );
}
