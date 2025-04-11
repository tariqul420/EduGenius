import CourseForm from "@/components/dashboard/instructor/CourseForm";

export default function AddCourse() {
  return (
    <section>
      <div className="container mx-auto max-w-3xl px-5 py-6">
        <h1 className="mb-5 text-3xl font-bold">Add Course</h1>
        <CourseForm />
      </div>
    </section>
  );
}
