import AllCourse from "@/components/shared/AllCourse";
import CourseCard from "@/components/shared/CourseCard";
import EmptyPage from "@/components/shared/NoResult";
import { getCategory } from "@/lib/actions/category.action";
import { getCourses } from "@/lib/actions/course.action";

export default async function Course({ searchParams }) {
  const categories = await getCategory();
  try {
    const { category } = await searchParams;
    const { level } = await searchParams;
    const { search } = await searchParams;

    const { courses } = await getCourses({
      categorySlug: category,
      level,
      search,
    });
    return (
      <AllCourse categories={JSON.parse(JSON.stringify(categories))}>
        {courses?.length > 0 ? (
          courses.map((course) => {
            course._id = course._id.toString();
            course.instructor._id = course.instructor._id.toString();
            course.category._id = course.category._id.toString();
            return (
              <CourseCard
                key={course._id}
                title={course.title}
                description={course.description}
                instructor={course.instructor.email}
                category={course.category.name}
                thumbnail={course.thumbnail}
                language={course.language}
                level={course.level}
                price={course.price}
                discount={course.discount}
                duration={course.duration}
                averageRating={course.averageRating}
                students={course.students}
                slug={course.slug}
              />
            );
          })
        ) : (
          <div className="flex justify-center items-center col-span-12 text-lg md:text-2xl font-medium">
            <EmptyPage/>
          </div>
        )}
      </AllCourse>
    );
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return <div>Failed to load courses. Please try again later.</div>;
  }
}
