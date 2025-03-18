import Heading from "@/components/shared/Heading";
import SlidePrViewSlider from "../shared/SlidePerViewSlider";


export default function TopInstructors() {
  return (
    <section>
      <div className="bg-[#08261c] py-8">
        <div className="container mx-auto py-8 max-lg:px-4 lg:max-w-6xl">
          <Heading title={`Top Rated Instructor`} subTitle={`The cost of receiving higher education in the United States has skyrocketed to impossible.`} />
          <div>
            <SlidePrViewSlider />
          </div>
        </div>
      </div>
    </section>
  );
}