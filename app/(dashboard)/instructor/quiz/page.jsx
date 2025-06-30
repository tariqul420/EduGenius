import DataTable from "@/components/dashboard/data-table";
import { instructorQuizColumns } from "@/components/dashboard/table-columns";
import { getQuizzes } from "@/lib/actions/quiz.action";

export default async function Quiz({ searchParams }) {
  const { pageSize, pageIndex, search } = await searchParams;

  const { quizzes, pagination } = await getQuizzes({
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
    search: search?.trim(),
  });

  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
        <DataTable
          pageIndex={Number(pageIndex || "1")}
          pageSize={Number(pageSize || "10")}
          total={pagination?.totalItems || 0}
          data={quizzes || []}
          columns={instructorQuizColumns || []}
          uniqueIdProperty="_id"
          enableRowSelection={false}
        />
      </div>
    </section>
  );
}
