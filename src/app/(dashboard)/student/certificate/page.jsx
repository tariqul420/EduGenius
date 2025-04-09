import CertificateTable from "@/components/dashboard/student/CertificateTable";
import { getCertificateByStudent } from "@/lib/actions/certificate.action";
import { auth } from "@clerk/nextjs/server";

export default async function StudentCertificate({ searchParams }) {
  const { sessionClaims } = await auth();
  const { page } = await searchParams;
  const {
    certificates = [],
    total = 0,
    hasNextPage = false,
  } = await getCertificateByStudent({
    studentId: sessionClaims?.userId,
    page: Number(page) || 1,
    limit: 6,
  });

  return (
    <section className="container mx-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
      <h1 className="dark:text-medium-bg text-dark-bg mb-6 text-2xl font-semibold">
        Certificate of Completion
      </h1>

      <CertificateTable certificates={certificates} />
    </section>
  );
}
