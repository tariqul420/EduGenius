// app/quiz-submission/page.jsx

import QuizSubmission from "@/components/dashboard/student/QuizSubmission";
import { getQuizzesQuestionForStudent } from "@/lib/actions/quiz.action";

export default async function QuizSubmissionPage() {
  const { quizzes } = await getQuizzesQuestionForStudent();

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="bg-light-bg dark:bg-dark-bg flex min-h-screen flex-col items-center justify-center py-12">
        <h1 className="text-dark-main text-3xl font-bold dark:text-white">
          No Quizzes Available
        </h1>
        <p className="text-muted-foreground mt-2">
          You don&apos;t have any quizzes assigned yet.
        </p>
      </div>
    );
  }

  return <QuizSubmission quizzes={quizzes} />;
}
