import DataTable from "@/components/dashboard/data-table";
import AssignmentStats from "@/components/dashboard/student/AssignmentStats";
import { studentAssignmentColumns } from "@/constant/columns";

export default async function StudentAssignment({ searchParams }) {
  const { pageSize, pageIndex } = await searchParams;

  const assignments = [
    {
      _id: 1,
      title: "Web Developer",
      course: "Complete Web Development",
      startDate: "30 Dec",
      dateLine: "5 Jan",
      mark: 50,
      yourMark: 40,
      status: "not submit",
    },
    {
      _id: 2,
      title: "Web Developer",
      course: "Complete Web Development",
      startDate: "30 Dec",
      dateLine: "5 Jan",
      mark: 50,
      yourMark: 40,
      status: "not submit",
    },
    {
      _id: 3,
      title: "Web Developer",
      course: "Complete Web Development",
      startDate: "30 Dec",
      dateLine: "5 Jan",
      mark: 50,
      yourMark: 40,
      status: "not submit",
    },
    {
      _id: 4,
      title: "Web Developer",
      course: "Complete Web Development",
      startDate: "30 Dec",
      dateLine: "5 Jan",
      mark: 50,
      yourMark: 40,
      status: "not submit",
    },
    {
      _id: 5,
      title: "Web Developer",
      course: "Complete Web Development",
      startDate: "30 Dec",
      dateLine: "5 Jan",
      mark: 50,
      yourMark: 40,
      status: "not submit",
    },
    {
      _id: 6,
      title: "Web Developer",
      course: "Complete Web Development",
      startDate: "30 Dec",
      dateLine: "5 Jan",
      mark: 50,
      yourMark: 40,
      status: "not submit",
    },
  ];

  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Assignments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and complete your assessments
          </p>
        </div>

        {/* Stats Cards */}
        <AssignmentStats />

        {/* Assignment Table Section */}

        <DataTable
          pageIndex={Number(pageIndex || "1")}
          pageSize={Number(pageSize || "10")}
          total={assignments.length || 0}
          data={assignments || []}
          columns={studentAssignmentColumns || []}
          uniqueIdProperty="_id"
        />
      </div>
    </section>
  );
}
