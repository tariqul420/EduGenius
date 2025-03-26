import SlidePrViewSlider from "../shared/SlidePerViewSlider";

export default function TopInstructors() {
  return (
    <section>
      <div className="bg-gradient-to-t dark:from-dark-bg dark:to-black py-8 mt-20">
        <div className="container mx-auto py-8 max-lg:px-4 lg:max-w-6xl">
          {/* Heading */}
          <div className="text-center mb-8 dark:text-light-bg">
            <h1 className="text-3xl font-bold">Top Rated Instructor</h1>
            <p className="mt-2 text-lg">The cost of receiving higher education in the United States has skyrocketed to impossible.</p>
          </div>

          <div>
            <SlidePrViewSlider />
          </div>
        </div>
      </div>
    </section>
  );
}