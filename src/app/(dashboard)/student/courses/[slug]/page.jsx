import ModulesList from "@/components/dashboard/student/ModuleList";
import Player from "@/components/dashboard/student/Player";
import { getModules } from "@/lib/actions/curriculum.action";

export default async function CourseModulesPage({ params }) {
  const { slug } = await params;

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
  const curriculum = await getModules({ slug });

  return (
    <section className="py-6">
      <div className="@container/main mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Player curriculum={curriculum} />
            <div className="mt-4">
              <h1 className="text-2xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
          </div>
          <div className="lg:col-span-4">
            <ModulesList curriculum={curriculum} />
          </div>
        </div>
      </div>
    </section>
  );
}
