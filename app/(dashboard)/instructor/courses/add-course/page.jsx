import CourseForm from "@/components/dashboard/instructor/course-form";

export default function AddCourse() {
  return (
    <section>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="container mx-auto max-w-3xl px-5 py-6">
          <h1 className="mb-5 text-3xl font-bold">Add Course</h1>
          <CourseForm />
        </div>
      </div>
    </section>
  );
}
