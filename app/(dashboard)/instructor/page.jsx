import { auth } from "@clerk/nextjs/server";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import DataTable from "@/components/dashboard/data-table";
import { SectionCards } from "@/components/section-cards";
import { SidebarInset } from "@/components/ui/sidebar";
import { instructorCourseColumns } from "@/constant/columns";
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
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
    search: search?.trim(),
  });

  const data = await courseSellingData();
  // console.log(courses[0].category.name);
  // const response = await generateQuiz(courses[0].category.name);

  // console.log("response", response);

  return (
    <SidebarInset>
      {/* <SiteHeader /> */}
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <ChartAreaInteractive data={data} />
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
