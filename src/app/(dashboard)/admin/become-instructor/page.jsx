import DataTable from "@/components/dashboard/data-table";
import { becomeInstructorsColumns } from "@/constant/columns";
import { getInstructorInfo } from "@/lib/actions/instructor.info.action";

export default async function BecomeInstructor({ searchParams }) {
  const { pageSize, pageIndex } = await searchParams;
  const { becomeInstructor, pagination } = await getInstructorInfo();
  return (
    <>
      <section className="py-6">
        <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
          <DataTable
            pageIndex={Number(pageIndex || "1")}
            pageSize={Number(pageSize || "10")}
            total={pagination?.totalItems || 0}
            data={becomeInstructor || []}
            columns={becomeInstructorsColumns || []}
            uniqueIdProperty="_id"
          />
        </div>
      </section>
    </>
  );
}
