import { auth } from "@clerk/nextjs/server";

import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import DataTable from "@/components/dashboard/data-table";
import AICourseReportCard from "@/components/dashboard/instructor/AICourseReportCard";
import { InstructorStats } from "@/components/dashboard/instructor/instructor-stats";
import { instructorCourseColumns } from "@/components/dashboard/table-columns";
import { SidebarInset } from "@/components/ui/sidebar";
import { generateInstructorCoursesReport } from "@/lib/actions/ai.action";
import { getCourseAdminInstructor } from "@/lib/actions/course.action";
import { courseSellingData } from "@/lib/actions/stats.action";

export default async function Home({ searchParams }) {
  const { pageSize, pageIndex, search } = await searchParams;

  const { sessionClaims } = await auth();
  const instructor = sessionClaims?.userId;
  if (!instructor) {
    throw new Error("User not authenticated");
  }

  const { courses, pagination } = await getCourseAdminInstructor({
    instructor: true,
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
    search: search?.trim(),
  });

  const data = await courseSellingData();

  const report = await generateInstructorCoursesReport();

  return (
    <SidebarInset>
      {/* <SiteHeader /> */}
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <InstructorStats />
            <ChartAreaInteractive data={data} />
            <AICourseReportCard report={report} />
            <DataTable
              pageIndex={Number(pageIndex || "1")}
              pageSize={Number(pageSize || "10")}
              total={pagination?.totalItems || 0}
              data={courses || []}
              columns={instructorCourseColumns || []}
              uniqueIdProperty="_id"
            />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
