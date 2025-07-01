import { Suspense } from "react";

import DataTable from "@/components/dashboard/data-table";
import AIRecommendations from "@/components/dashboard/student/ai-recommendations";
import StudentDashboard from "@/components/dashboard/student/dashboard-stats";
import { studentCertificateColumns } from "@/components/dashboard/table-columns";
import { Skeleton } from "@/components/ui/skeleton";
import { getCertificateByStudent } from "@/lib/actions/certificate.action";
import { getStudentDashboardStats } from "@/lib/actions/stats.action";

export default async function StudentHome({ searchParams }) {
  const { pageSize, pageIndex } = await searchParams;

  const { certificates, pagination } = await getCertificateByStudent({
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
  });

  const stats = await getStudentDashboardStats();

  return (
    <section className="min-h-screen py-8">
      <div className="@container/main mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Student Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your certificates
          </p>
        </div>

        {/* Stats Cards */}
        <StudentDashboard stats={stats} />

        {/* Certificates Section */}
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          My Certificates
        </h2>

        <DataTable
          pageIndex={Number(pageIndex || "1")}
          pageSize={Number(pageSize || "10")}
          total={pagination?.totalItems || 0}
          data={certificates || []}
          columns={studentCertificateColumns || []}
          uniqueIdProperty="_id"
        />

        {/* AI Recommendations */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
            Personalized Recommendations
          </h2>
          <Suspense
            fallback={
              <div className="grid gap-4 md:grid-cols-3">
                {/* Simulate 3 skeleton cards */}
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="from-light-bg to-light-bg dark:from-dark-bg dark:to-dark-bg relative flex flex-col rounded-md bg-gradient-to-br p-6"
                  >
                    <Skeleton className="mb-4 h-6 w-1/3" />
                    <Skeleton className="mb-2 h-4 w-full" />
                    <Skeleton className="mb-4 h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                ))}
              </div>
            }
          >
            <AIRecommendations />
          </Suspense>
        </div>

        {/* <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Your Learning Path</h2>
          <Suspense fallback={<div>Analyzing your progress...</div>}>
            <LearningPath />
          </Suspense>
        </div> */}
      </div>
    </section>
  );
}
