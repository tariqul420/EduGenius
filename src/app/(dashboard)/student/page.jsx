import ApplyInstructorForm from "@/components/dashboard/student/ApplyInstructorForm";
import CertificateTable from "@/components/dashboard/student/CertificateTable";
import StudentDashboard from "@/components/StudentDashboard";
import { getCertificateByStudent } from "@/lib/actions/certificate.action";
import { auth } from "@clerk/nextjs/server";

export default async function StudentHome({ searchParams }) {
  const { sessionClaims } = await auth();
  const { page } = await searchParams;
  const { certificates = [] } = await getCertificateByStudent({
    studentId: sessionClaims?.userId,
    page: Number(page) || 1,
    limit: 6,
  });

  return (
    <section className="min-h-screen grid grid-cols-4 gap-4 py-8">
     
     <div className="container lg:col-span-2 col-span-4  mx-auto px-4 md:px-6 lg:px-8">
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
        <StudentDashboard />

        {/* Certificates Section */}
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          My Certificates
        </h2>
        <CertificateTable certificates={certificates} />
      </div>
      <div className="lg:col-span-2 col-span-4">
        <ApplyInstructorForm></ApplyInstructorForm>
      
     </div>
    </section>
  );
}
