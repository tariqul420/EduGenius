import DataTable from "@/components/dashboard/data-table";
import { studentCertificateColumns } from "@/constant/columns";
import { getCertificateByStudent } from "@/lib/actions/certificate.action";

export default async function StudentCertificate({ searchParams }) {
  const { pageSize, pageIndex } = await searchParams;

  const { certificates, pagination } = await getCertificateByStudent({
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
  });

  console.log(certificates, pagination);

  return (
    <section className="@container/main mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="dark:text-medium-bg text-dark-bg mb-6 text-2xl font-semibold">
        Certificate of Completion
      </h1>
      <DataTable
        pageIndex={Number(pageIndex || "1")}
        pageSize={Number(pageSize || "10")}
        total={pagination?.totalItems || 0}
        data={certificates || []}
        columns={studentCertificateColumns || []}
        uniqueIdProperty="_id"
      />
    </section>
  );
}
