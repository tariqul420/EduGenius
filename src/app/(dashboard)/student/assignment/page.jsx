import CertificateTable from "@/components/dashboard/student/CertificateTable";
import DashboardStats from "@/components/dashboard/student/StudentDashboard";
import { getCertificateByStudent } from "@/lib/actions/certificate.action";
import { getStudentDashboardStats } from "@/lib/actions/stats.action";
import { auth } from "@clerk/nextjs/server";

export default async function StudentHome({ searchParams }) {
  const { sessionClaims } = await auth();
  const { page } = await searchParams;
  const { certificates = [] } = await getCertificateByStudent({
    studentId: sessionClaims?.userId,
    page: Number(page) || 1,
    limit: 6,
  });

  const stats = await getStudentDashboardStats();

  return (
    <section className="min-h-screen py-8">
      <div className="@container/main mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Assignments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and complete your assessments
          </p>
        </div>

        {/* Stats Cards */}
        <DashboardStats stats={stats} />

        {/* Certificates Section */}
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          My Certificates
        </h2>
        <CertificateTable certificates={certificates} />
      </div>
    </section>
  );
}
