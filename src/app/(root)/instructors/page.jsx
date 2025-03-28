import InstructorCard from "@/components/shared/InstructorCard";
import LoadMore from "@/components/shared/LoadMore";
import SlidePrViewSlider from "@/components/shared/SlidePerViewSlider";
import { getInstructors } from "@/lib/actions/instructor.action";

export default async function Instructors({ searchParams }) {
  const { page } = await searchParams;

  // Fetch instructors for the current page
  const instructorsResult = await getInstructors({
    role: "instructor",
    page: Number(page) || 1,
    limit: 4,
  });
  const instructors = instructorsResult?.users || [];
  const total = instructorsResult?.total || 0;
  const hasNextPage = instructorsResult?.hasNextPage || false;

  const bestInstructorsResult = await getInstructors({
    role: "instructor",
    limit: 5,
  });

  const bestInstructors = bestInstructorsResult?.users || [];

  return (
    <>
      <section>
        <div className="container mx-auto py-8 max-sm:px-4 lg:max-w-6xl">
          <div className="flex items-center justify-between border-b pb-4">
            <h1 className="text-xl font-bold">Our All Instructor</h1>
            <p className="dark:text-medium-bg text-sm font-medium text-gray-600">
              Showing {instructors.length} Of {total} Results
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {instructors &&
              instructors.length > 0 &&
              instructors.map((instructor, idx) => (
                <InstructorCard key={idx} instructor={instructor} />
              ))}
          </div>
          {hasNextPage && <LoadMore />}
        </div>
      </section>

      <section>
        <div className="dark:from-dark-bg mt-20 bg-gradient-to-t py-8 dark:to-black">
          <div className="container mx-auto py-8 max-lg:px-4 lg:max-w-6xl">
            {/* Heading */}
            <div className="dark:text-light-bg mb-8 text-center">
              <h1 className="text-3xl font-bold">Popular Instructor</h1>
              <p className="mt-2 text-lg">
                The cost of receiving higher education in the United States has
                skyrocketed to impossible.
              </p>
            </div>

            <div>
              <SlidePrViewSlider bestInstructors={bestInstructors} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto py-8 max-lg:px-4 lg:max-w-6xl">
          <div className="flex items-center justify-between border-b pb-4">
            <h1 className="text-xl font-bold">Best Teacher of this Season</h1>
            <p className="text-sm font-medium text-gray-500">
              Showing {bestInstructors.length} Of 5 Results
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {bestInstructors &&
              bestInstructors.length > 0 &&
              bestInstructors.map((instructor, idx) => (
                <InstructorCard key={idx} instructor={instructor} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
