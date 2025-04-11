import CourseEditForm from "@/components/dashboard/instructor/CourseEditForm";
import ModuleForm from "@/components/dashboard/instructor/ModuleForm";
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
    <section>
      <div className="container mx-auto max-w-3xl px-5 py-6">
        <h1 className="mb-5 text-3xl font-bold">Edit Course</h1>
        <Tabs defaultValue="basic" className="w-full space-y-5">
          <TabsList className="w-full">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <CourseEditForm course={course} />
          </TabsContent>

          <TabsContent value="curriculum">
            <ModuleForm courseId={course._id} curriculum={curriculum} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
