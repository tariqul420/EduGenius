import SlidePrViewSlider from "../shared/SlidePerViewSlider";

import Heading from "@/components/shared/Heading";

export default function TopInstructors({ bestInstructors }) {
  return (
    <section>
      <div className="dark:from-dark-bg dark:to-dark-theme bg-gradient-to-t py-8">
        <div className="container mx-auto py-8 max-lg:px-4 lg:max-w-6xl">
          {/* Heading */}
          <Heading
            title={"Top Rated Instructor"}
            subTitle={
              "The cost of receiving higher education in the United States has  skyrocketed to impossible."
            }
          />

          <div>
            <SlidePrViewSlider bestInstructors={bestInstructors} />
          </div>
        </div>
      </div>
    </section>
  );
}
