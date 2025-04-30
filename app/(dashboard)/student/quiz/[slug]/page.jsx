import QuizSubmission from "@/components/dashboard/student/QuizSubmission";
import { getQuizForCourseSlug } from "@/lib/actions/quiz.action";

export default async function QuizSubmissionPage({ params }) {
  const { slug } = await params;

  const { quiz } = await getQuizForCourseSlug(slug);

  return <QuizSubmission quiz={quiz} />;
}
