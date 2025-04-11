import CourseForm from "@/components/dashboard/instructor/CourseForm";

export default function AddCourse() {
  return (
    <section>
      <div className="container mx-auto px-5 py-6">
        <h1 className="text-2xl font-bold">Add Course</h1>
        <CourseForm />
      </div>
    </section>
  );
}
