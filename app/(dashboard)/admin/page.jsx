import { AdminStats } from "@/components/dashboard/admin/AdminStats";
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import DataTable from "@/components/dashboard/data-table";
import { adminInstructorColumns } from "@/components/dashboard/table-columns";
import { SidebarInset } from "@/components/ui/sidebar";
import { getInstructorByAdmin } from "@/lib/actions/instructor.action";
import { courseSellingData } from "@/lib/actions/stats.action";

export default async function dashboard({ searchParams }) {
  const { pageSize, pageIndex, search } = await searchParams;

  const { instructors, pagination } = await getInstructorByAdmin({
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
    search: search?.trim(),
  });
  const data = await courseSellingData();

  return (
    <SidebarInset>
      {/* <SiteHeader /> */}
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <AdminStats />
            <ChartAreaInteractive data={data} />
            <DataTable
              pageIndex={Number(pageIndex || "1")}
              pageSize={Number(pageSize || "10")}
              total={pagination?.totalItems || 0}
              data={instructors || []}
              columns={adminInstructorColumns || []}
              uniqueIdProperty="_id"
            />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
