import ModulesList from "@/components/dashboard/student/ModuleList";
import Player from "@/components/dashboard/student/Player";
import QuizAssignment from "@/components/dashboard/student/QuizAssignment";
import TextSeeMore from "@/components/shared/text-see-more";
import { getCourseStudentBySlug } from "@/lib/actions/course.action";
import { getModules } from "@/lib/actions/curriculum.action";

export default async function CourseModulesPage({ params }) {
  const { slug } = await params;
  const curriculum = await getModules({ slug });
  const course = await getCourseStudentBySlug(slug);

  console.log(course);

  return (
    <section className="py-6">
      <div className="@container/main mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Player curriculum={curriculum} />
            <div className="mt-4">
              <h1 className="text-2xl font-bold">{course?.title}</h1>
              <TextSeeMore description={course?.description} />
            </div>
            <QuizAssignment slug={slug} course={course} />
          </div>
          <div className="mb-8 lg:col-span-4">
            <ModulesList curriculum={curriculum} />
          </div>
        </div>
      </div>
    </section>
  );
}
