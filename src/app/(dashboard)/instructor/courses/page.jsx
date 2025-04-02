import CourseTable from "@/components/dashboard/instructor/CourseTable";
import { Button } from "@/components/ui/button";

export default function Courses() {
  return (
    <section>
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="dark:bg-dark-bg mb-6 flex items-center justify-between rounded-md border bg-white p-6 shadow-md">
          <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Courses
          </h1>
          <div>
            <Button className="mb-4" variant="outline">
              Create Course
            </Button>
          </div>
        </div>
        <CourseTable />
      </div>
    </section>
  );
}
