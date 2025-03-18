import Heading from "@/components/shared/Heading";
import SlidePrViewSlider from "../shared/SlidePerViewSlider";


export default function TopInstructors() {
  return (
    <section>
      <div className="bg-[#08261c] py-8 mt-20">
        <div className="container mx-auto py-8 max-lg:px-4 lg:max-w-6xl">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Top Rated Instructor</h1>
            <p className="mt-2 text-lg text-gray-400 dark:text-gray-200">The cost of receiving higher education in the United States has skyrocketed to impossible.</p>
          </div>

          <div>
            <SlidePrViewSlider />
          </div>
        </div>
      </div>
    </section>
  );
}