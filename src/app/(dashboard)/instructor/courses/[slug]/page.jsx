import AssignmentForm from "@/components/dashboard/instructor/AssignmentForm";
import CourseForm from "@/components/dashboard/instructor/CourseForm";
import ModuleForm from "@/components/dashboard/instructor/ModuleForm";
import QuizForm from "@/components/dashboard/instructor/QuizForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getCourseBySlug,
  getCourseCurriculum,
} from "@/lib/actions/course.action";

export default async function EditCourse({ params }) {
  const { slug } = await params;

  const course = await getCourseBySlug(slug);
  const curriculum = await getCourseCurriculum(course._id);

  return (
    <>
      <section>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="container mx-auto max-w-4xl px-5 py-6">
            <h1 className="mb-5 text-3xl font-bold">Edit Course</h1>
            <Tabs
              defaultValue="basic"
              className="w-full space-y-5 rounded border px-3 py-3 shadow-xl md:px-8 md:py-5"
            >
              <TabsList className="dark:bg-dark-hover w-full rounded bg-gray-50 px-1.5 py-5 shadow-sm">
                <TabsTrigger
                  value="basic"
                  className="data-[state=active]:text-main dark:data-[state=active]:bg-dark-bg dark:data-[state=active]:text-main-dark rounded px-6 py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Basic Information
                </TabsTrigger>
                <TabsTrigger
                  value="curriculum"
                  className="roundedpx-6 data-[state=active]:text-main dark:data-[state=active]:bg-dark-bg dark:data-[state=active]:text-main-dark py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Curriculum
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic">
                <CourseForm course={course} />
              </TabsContent>

              <TabsContent value="curriculum">
                <ModuleForm
                  courseId={course._id}
                  curriculum={curriculum}
                  slug={course.slug}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      <section>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="container mx-auto max-w-4xl px-5 py-6">
            <Tabs
              defaultValue="quiz"
              className="w-full space-y-5 rounded border px-3 py-3 shadow-xl md:px-8 md:py-5"
            >
              <TabsList className="dark:bg-dark-hover w-full rounded">
                <TabsTrigger
                  value="quiz"
                  className="data-[state=active]:text-main dark:data-[state=active]:bg-dark-bg dark:data-[state=active]:text-main-dark rounded px-6 py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Quiz
                </TabsTrigger>
                <TabsTrigger
                  value="assignment"
                  className="data-[state=active]:text-main dark:data-[state=active]:bg-dark-bg dark:data-[state=active]:text-main-dark rounded px-6 py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Assignment
                </TabsTrigger>
              </TabsList>

              <TabsContent value="quiz">
                <QuizForm courseId={course._id} />
              </TabsContent>

              <TabsContent value="assignment">
                <AssignmentForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}
