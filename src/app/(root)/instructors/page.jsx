import InstructorCard from "@/components/shared/InstructorCard";
import LoadMore from "@/components/shared/LoadMore";
import SlidePrViewSlider from "@/components/shared/SlidePerViewSlider";
import { instructors } from "@/constant";

export default function Instructors() {
  return (
    <>
      <section>
        <div className="container lg:px-4 lg:max-w-7xl mx-auto py-8 max-lg:px-4">
          <div className="flex justify-between items-center border-b pb-4">
            <h1 className="text-xl font-bold">Our All Instructor</h1>
            <p className="text-gray-500 text-sm font-medium">
              Showing 5 Of 9 Results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {instructors.map((instructor, idx) => (
              <InstructorCard key={idx} instructor={instructor} />
            ))}
          </div>
          <LoadMore />
        </div>
      </section>

      <section>
        <div className="bg-[#08261c] py-8">
          <div className="container lg:px-4 lg:max-w-7xl mx-auto py-8 max-lg:px-4">
            <div className="space-y-2.5 flex flex-col items-center">
              <h1 className="text-center font-bold text-xl text-white">
                Popular Instructor
              </h1>
              <p className="text-center text-sm text-white max-w-sm leading-6">
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
        <div className="container lg:px-4 lg:max-w-7xl mx-auto py-8 max-lg:px-4">
          <div className="flex justify-between items-center border-b pb-4">
            <h1 className="text-xl font-bold">Best Teacher of this Season</h1>
            <p className="text-gray-500 text-sm font-medium">
              Showing 5 Of 5 Results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {instructors.map((instructor, idx) => (
              <InstructorCard key={idx} instructor={instructor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
