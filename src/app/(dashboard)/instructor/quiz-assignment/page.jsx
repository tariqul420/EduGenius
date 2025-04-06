import { ClipboardList, Clock, CheckCircle, AlertCircle, BookOpen, Download } from "lucide-react";

export default function QuizAssignment() {
  // Sample data
  const quizzes = [
    {
      id: 1,
      title: "JavaScript Fundamentals Quiz",
      course: "Complete Web Development",
      dueDate: "May 15, 2025",
      status: "Pending",
      questions: 20,
      duration: "30 mins"
    },
    {
      id: 2,
      title: "React Components Assignment",
      course: "React Masterclass",
      dueDate: "May 20, 2025",
      status: "Submitted",
      questions: 15,
      duration: "45 mins"
    },
    {
      id: 3,
      title: "Node.js API Design Quiz",
      course: "Backend Development",
      dueDate: "May 10, 2025",
      status: "Missed",
      questions: 25,
      duration: "40 mins"
    },
    {
      id: 4,
      title: "CSS Layout Challenge",
      course: "Advanced CSS",
      dueDate: "May 25, 2025",
      status: "Upcoming",
      questions: 10,
      duration: "25 mins"
    }
  ];

  return (
    <section className="min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Quiz & Assignments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and complete your assessments
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="rounded-lg border bg-white p-6 shadow-md dark:border dark:bg-dark-bg">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                <ClipboardList className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Assignments
                </h3>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  12
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-md dark:border dark:bg-dark-bg">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Completed
                </h3>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  8
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-md dark:border dark:bg-dark-bg">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Pending
                </h3>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  3
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-md dark:border dark:bg-dark-bg">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-300" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Missed
                </h3>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  1
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quizzes & Assignments List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Upcoming Assessments
          </h2>
          
          <div className="space-y-4">
            {quizzes.map((quiz) => (
              <div 
                key={quiz.id} 
                className="rounded-lg border bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:border dark:bg-dark-bg"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Left Section */}
                  <div className="flex items-start gap-4">
                    <div className={`rounded-full p-3 ${
                      quiz.status === "Submitted" ? "bg-green-100 dark:bg-green-900" :
                      quiz.status === "Missed" ? "bg-red-100 dark:bg-red-900" :
                      quiz.status === "Upcoming" ? "bg-blue-100 dark:bg-blue-900" :
                      "bg-yellow-100 dark:bg-yellow-900"
                    }`}>
                      {quiz.status === "Submitted" ? (
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
                      ) : quiz.status === "Missed" ? (
                        <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-300" />
                      ) : quiz.status === "Upcoming" ? (
                        <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                      ) : (
                        <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        {quiz.title}
                      </h3>
                      <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {quiz.course}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-4">
                        <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4" />
                          Due: {quiz.dueDate}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          {quiz.questions} questions
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          Duration: {quiz.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="ml-auto flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      quiz.status === "Submitted" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                      quiz.status === "Missed" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" :
                      quiz.status === "Upcoming" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}>
                      {quiz.status}
                    </span>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
                      quiz.status === "Submitted" ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200" :
                      quiz.status === "Missed" ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200" :
                      "bg-main text-white hover:bg-dark-btn dark:bg-dark-btn dark:hover:bg-dark-btn/80"
                    }`}>
                      {quiz.status === "Submitted" ? (
                        <>
                          <Download className="h-4 w-4" />
                          View Results
                        </>
                      ) : quiz.status === "Missed" ? (
                        "View Details"
                      ) : (
                        "Start Now"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}