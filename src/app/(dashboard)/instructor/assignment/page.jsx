import AssignmentTable from "@/components/dashboard/instructor/AssignmentTable";
import { getAssignment } from "@/lib/actions/assignment.action";

export default async function Assignment({ searchParams }) {
  const { pageSize, pageIndex } = await searchParams;

  const { assignments, pagination } = await getAssignment();

  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <AssignmentTable
          pageIndex={Number(pageIndex || "1")}
          pageSize={Number(pageSize || "10")}
          total={pagination?.totalItems || 0}
          data={assignments || []}
        />
      </div>
    </section>
  );
}
