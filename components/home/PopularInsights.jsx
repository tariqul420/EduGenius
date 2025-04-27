import InsightsCard from "./InsightsCard";

import Heading from "@/components/shared/Heading";

const PopularInsights = async ({ blogs }) => {
  return (
    <section className="dark:to-dark-bg dark:from-dark-theme bg-gradient-to-b">
      <div className="container mx-auto mt-10 px-2 md:px-5 lg:max-w-6xl">
        {/* Heading Section */}
        <Heading
          title={"Popular Insights"}
          subTitle={
            "Discover insights through the latest analysis to enhance your knowledge from our expert contributors."
          }
        />

        <div className="mb-16 grid grid-cols-1 gap-6 px-3 sm:grid-cols-2 sm:px-0 lg:grid-cols-3">
          {blogs?.map((insights, index) => (
            <InsightsCard key={index} insights={insights} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularInsights;
