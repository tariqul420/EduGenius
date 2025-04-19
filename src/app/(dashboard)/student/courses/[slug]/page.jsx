import ModulesList from "@/components/dashboard/student/ModuleList";
import Player from "@/components/dashboard/student/Player";

export default async function CourseModulesPage({ params }) {
  const { slug } = await params;

  console.log(slug);

  const course = {
    id: "course-001",
    title: "Complete Web Development Bootcamp",
    description: "Master web development from scratch to advanced concepts",
    instructor: {
      id: "ins-001",
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    thumbnail: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2",
    totalModules: 4,
    completedModules: 1,
    progress: 25,
  };

  const modules = [
    {
      id: 1,
      title: "Introduction to Web Development",
      description:
        "Learn the basics of web development and how the internet works",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "10:00",
      completed: true,
    },
    {
      id: 2,
      title: "HTML Fundamentals",
      description: "Understanding HTML tags, elements, and document structure",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "15:30",
      completed: false,
    },
    {
      id: 3,
      title: "CSS Styling",
      description: "Master CSS selectors, properties, and responsive design",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "20:15",
      completed: false,
    },
    {
      id: 4,
      title: "JavaScript Basics",
      description: "Introduction to JavaScript programming concepts",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "25:45",
      completed: false,
    },
  ];

  return (
    <section className="py-6">
      <div className="@container/main mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Player videoUrl={modules[0].videoUrl} />
            <div className="mt-4">
              <h1 className="text-2xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
          </div>
          <div className="lg:col-span-4">
            <ModulesList modules={modules} />
          </div>
        </div>
      </div>
    </section>
  );
}
