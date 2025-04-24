import DataTable from "@/components/dashboard/data-table";
import { studentQuizColumns } from "@/constant/columns";
import { getQuizzesForStudent } from "@/lib/actions/quiz.action";

export default async function Quiz({ searchParams }) {
  const { pageSize, pageIndex, search } = await searchParams;

  const { quizzes, pagination } = await getQuizzesForStudent({
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
    search: search?.trim(),
  });
  // console.log("quizzes", quizzes);
  // const quizzes = [
  //   {
  //     id: 1,
  //     title: "Web Developer",
  //     course: "Complete Web Development",
  //     startDate: "30 Dec",
  //     totalQuiz: 10,
  //     yourMark: 9,
  //     status: "Not submit",
  //   },
  // ];

  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
        <DataTable
          pageIndex={Number(pageIndex || "1")}
          pageSize={Number(pageSize || "10")}
          total={pagination?.totalItems || 0}
          data={quizzes || []}
          columns={studentQuizColumns || []}
          uniqueIdProperty="_id"
        />
      </div>
    </section>
  );
}
