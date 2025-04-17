import DataTable from "@/components/dashboard/data-table";
import QuizStats from "@/components/dashboard/student/QuizStats";
import { studentQuizColumns } from "@/constant/columns";

export default async function StudentQuiz({ searchParams }) {
  const { pageSize, pageIndex } = await searchParams;

  const quizzes = [
    {
      id: 1,
      title: "Web Developer",
      course: "Complete Web Development",
      startDate: "30 Dec",
      totalQuiz: 10,
      yourMark: 9,
      status: "Not submit",
    },
  ];

  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Quiz
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and complete your quiz
          </p>
        </div>

        {/* Stats Cards */}
        <QuizStats />

        <DataTable
          pageIndex={Number(pageIndex || "1")}
          pageSize={Number(pageSize || "10")}
          total={quizzes.length || 0}
          data={quizzes || []}
          columns={studentQuizColumns || []}
          uniqueIdProperty="_id"
        />
      </div>
    </section>
  );
}
