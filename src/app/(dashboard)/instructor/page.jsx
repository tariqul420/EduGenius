import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SidebarInset } from "@/components/ui/sidebar";
import { getCourses } from "@/lib/actions/course.action";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { sessionClaims } = await auth();
  const instructor = sessionClaims?.userId;
  if (!instructor) {
    throw new Error("User not authenticated");
  }

  const result = await getCourses({ instructor, limit: 5 });

  const courses = result?.courses || [];

  return (
    <SidebarInset>
      {/* <SiteHeader /> */}
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={courses} />
          </div>
        </div>
      </div>
    </SidebarInset>

    // <section className="min-h-screen">
    //   <div className="container mx-auto p-4 md:p-6 lg:p-8">
    //     <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">
    //       Overview
    //     </h1>
    //     <div className="grid grid-cols-1 gap-4 rounded-md border p-6 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
    //       {/* Cards */}
    //       {cardData?.map((card, index) => (
    //         <div
    //           key={index}
    //           className="dark:bg-dark-bg flex items-center gap-4 rounded-lg border bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
    //         >
    //           <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
    //             <card.icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
    //           </div>
    //           <div>
    //             <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">
    //               {card.num}
    //             </h4>
    //             <p className="text-sm text-gray-600 dark:text-gray-400">
    //               {card.name}
    //             </p>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //     <div className="mt-6 grid gap-5 md:grid-cols-2">
    //       <CourseStatistic />

    //       <SellingReport />
    //     </div>

    //     <div className="mt-6">
    //       <BestSellingCourse />
    //     </div>
    //   </div>
    // </section>
  );
}
