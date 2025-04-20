import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { AdminStats } from "@/components/dashboard/admin/AdminStats";
import { SidebarInset } from "@/components/ui/sidebar";
import { courseSellingData } from "@/lib/actions/stats.action";

export default async function dashboard() {
  const data = await courseSellingData({ admin: true });

  return (
    <SidebarInset>
      {/* <SiteHeader /> */}
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <AdminStats />
            <ChartAreaInteractive data={data} />
            {/* <DataTable
              pageIndex={Number(pageIndex || "1")}
              pageSize={Number(pageSize || "10")}
              total={result?.total || 0}
              data={courses || []}
              columns={instructorCourseColumns || []}
              uniqueIdProperty="_id"
            /> */}
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
