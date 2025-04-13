import CourseCard from "@/components/dashboard/student/CourseCard";

export default function StudentCourse() {
  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "Jane Doe",
      image:
        "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg",
      progress: 50,
    },
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "Jane Doe",
      image:
        "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg",
      progress: 75,
    },
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "Jane Doe",
      image:
        "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg",
      progress: 75,
    },
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "Jane Doe",
      image:
        "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg",
      progress: 75,
    },
  ];

  return (
    <section className="min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Learning
          </h1>
          <p className="mt-4 max-w-2xl">
            Dive into your learning journey with our curated courses designed to
            help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
