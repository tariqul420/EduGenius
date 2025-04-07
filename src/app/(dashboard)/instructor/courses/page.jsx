import CourseTable from "@/components/dashboard/instructor/CourseTable";
import { Button } from "@/components/ui/button";

export default function Courses() {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="dark:bg-dark-bg mb-8 flex items-center justify-between rounded-lg border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Courses
          </h1>
          <div>
            <Button
              variant="outline"
              className="px-4 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Create Course
            </Button>
          </div>
        </div>
        <div className="dark:bg-dark-bg rounded-lg border bg-white p-6 shadow-sm">
          <CourseTable />
        </div>
      </div>
    </section>
  );
}
