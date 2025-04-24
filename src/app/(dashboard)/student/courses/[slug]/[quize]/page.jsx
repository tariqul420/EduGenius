// app/quiz-submission/page.jsx
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-dark-main mb-8 text-3xl font-bold dark:text-white">
        Available Quizzes
      </h1>

      <div className="space-y-8">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="border-border dark:border-dark-border dark:bg-dark-bg rounded-2xl border bg-white p-6 shadow-md"
          >
            <div className="border-border mb-4 border-b pb-4">
              <h2 className="text-dark-main text-xl font-semibold dark:text-white">
                {quiz.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                Course: <span className="font-medium">{quiz.course.title}</span>{" "}
                | Questions:{" "}
                <span className="font-medium">
                  {quiz.questions?.length || 0}
                </span>
              </p>
            </div>

            {quiz.questions?.map((question, qIndex) => (
              <div
                key={question._id}
                className="border-border dark:bg-dark-foreground dark:border-dark-border mb-6 rounded-xl border bg-gray-50 dark:bg-transparent p-4"
              >
                <h3 className="text-dark-main mb-3 text-base font-semibold dark:text-white">
                  {qIndex + 1}. {question.question}
                </h3>

                <div className="space-y-2">
                  {question.options?.map((option) => (
                    <div
                      key={option._id}
                      className="flex items-start gap-3 text-sm"
                    >
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        className="text-main accent-main mt-1 h-4 w-4"
                        readOnly
                      />
                      <label className="text-muted-foreground">
                        {option.option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
