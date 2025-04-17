import DataTable from "@/components/dashboard/data-table";
import StudentDashboard from "@/components/dashboard/student/DashboardStats";
import { studentCertificateColumns } from "@/constant/columns";
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
      </div>
    </section>
  );
}
