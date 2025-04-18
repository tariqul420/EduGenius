import { getInstructorByAdmin } from "@/lib/actions/instructor.action";

export default async function AdminInstructors({ searchParams }) {
  const { pageSize, pageIndex } = await searchParams;

  // const { certificates, pagination } = await getCertificateByStudent({
  //   limit: Number(pageSize || 10),
  //   page: Number(pageIndex || 1),
  // });

  const { instructors, pagination } = await getInstructorByAdmin({
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
  });

  console.log(instructors);

  return (
    <section className="@container/main flex flex-1 flex-col gap-2 px-4 py-6 lg:px-6">
      {/* <DataTable
        pageIndex={Number(pageIndex || "1")}
        pageSize={Number(pageSize || "10")}
        total={pagination?.totalItems || 0}
        data={certificates || []}
        columns={studentCertificateColumns || []}
        uniqueIdProperty="_id"
      /> */}
    </section>
  );
}
