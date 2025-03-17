import InstructorCard from "@/components/shared/InstructorCard";
import LoadMore from "@/components/shared/LoadMore";
import SlidePrViewSlider from "@/components/shared/SlidePerViewSlider";
import { instructors } from "@/constant";
import { getInstructors } from "@/lib/actions/instructor.action";

export default async function Instructors() {
  const data = await getInstructors();
  console.log(data);

  return (
    <>
      <section>
        <div className="container mx-auto py-8 max-sm:px-4 lg:max-w-6xl">
          <div className="flex items-center justify-between border-b pb-4">
            <h1 className="text-xl font-bold">Our All Instructor</h1>
            <p className="text-sm font-medium text-gray-500">
              Showing 5 Of 9 Results
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {instructors?.map((instructor, idx) => (
              <InstructorCard key={idx} instructor={instructor} />
            ))}
          </div>
          <LoadMore />
        </div>
      </section>

      <section>
        <div className="bg-[#08261c] py-8">
          <div className="container mx-auto py-8 max-lg:px-4 lg:max-w-6xl">
            <div className="flex flex-col items-center space-y-2.5">
              <h1 className="text-center text-xl font-bold text-white">
                Popular Instructor
              </h1>
              <p className="max-w-sm text-center text-sm leading-6 text-white">
                The cost of receiving higher education in the United States has
                skyrocketed to impossible.
              </p>
            </div>
            <div>
              <SlidePrViewSlider />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto py-8 max-lg:px-4 lg:max-w-6xl">
          <div className="flex items-center justify-between border-b pb-4">
            <h1 className="text-xl font-bold">Best Teacher of this Season</h1>
            <p className="text-sm font-medium text-gray-500">
              Showing 5 Of 5 Results
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {instructors.map((instructor, idx) => (
              <InstructorCard key={idx} instructor={instructor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
