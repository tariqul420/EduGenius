import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Overview
        </h1>
        <div className="grid grid-cols-1 gap-4 rounded-md border p-6 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                7
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                New Courses
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
              <BookOpen className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                12
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Active Students
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
              <BookOpen className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                3
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pending Reviews
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
              <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                25
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Lessons
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
