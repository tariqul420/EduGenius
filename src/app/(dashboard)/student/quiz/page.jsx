import QuizStats from "@/components/dashboard/student/QuizStats";
import QuizTable from "@/components/dashboard/student/QuizTable";

export default async function StudentQuiz({ searchParams }) {
  // const { sessionClaims } = await auth();
  // const { page } = await searchParams;
  // const { certificates = [] } = await getCertificateByStudent({
  //   studentId: sessionClaims?.userId,
  //   page: Number(page) || 1,
  //   limit: 6,
  // });

  const quiz = [
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
    <section className="min-h-screen py-8">
      <div className="@container/main mx-auto px-4 md:px-6 lg:px-8">
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

        {/* Certificates Section */}
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          My Quiz
        </h2>
        {/* <AssignmentTable
          assignment={assignment}
          total={assignment.length}
          hasNextPage={false}
        /> */}

        <QuizTable quiz={quiz} total={quiz?.length} hasNextPage={false} />
      </div>
    </section>
  );
}
