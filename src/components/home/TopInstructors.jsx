import SlidePrViewSlider from "../shared/SlidePerViewSlider";

export default function TopInstructors({ bestInstructors }) {
  return (
    <section>
      <div className="dark:from-dark-bg  bg-gradient-to-t py-8 dark:to-dark-theme">
        <div className="container mx-auto py-8 max-lg:px-4 lg:max-w-6xl">
          {/* Heading */}
          <div className="dark:text-light-bg mb-8 text-center">
            <h1 className="text-3xl font-bold">Top Rated Instructor</h1>
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
  );
}
