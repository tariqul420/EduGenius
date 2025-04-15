import StudentTable from "@/components/dashboard/instructor/StudentTable";
import { getStudents } from "@/lib/actions/instructor.action";
import { auth } from "@clerk/nextjs/server";

export default async function Student({ searchParams }) {
  const { pageSize, pageIndex } = await searchParams;

  const { sessionClaims } = await auth();
  const instructor = sessionClaims?.userId;
  if (!instructor) {
    throw new Error("User not authenticated");
  }

  const { students, pagination } = await getStudents({
    instructorId: instructor,
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
  });

  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <StudentTable
          pageIndex={Number(pageIndex || "1")}
          pageSize={Number(pageSize || "10")}
          total={pagination?.total || 0}
          data={students || []}
        />
      </div>
    </section>
  );
}
