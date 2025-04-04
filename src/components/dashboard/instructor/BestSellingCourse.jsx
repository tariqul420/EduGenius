import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CourseTable from "./CourseTable";

export default function BestSellingCourse() {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Best Selling Courses</CardTitle>
          <CardDescription>
            Showing Best Selling Courses for the last 3 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {/* TODO: Need add a table from Shadcn Data table */}
        <CourseTable />
      </CardContent>
    </Card>
  );
}
