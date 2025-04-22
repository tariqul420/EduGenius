import InsightsCard from "./InsightsCard";

import Heading from "@/components/shared/Heading";

const PopularInsights = async ({ blogs }) => {
  return (
    <section className="dark:to-dark-bg bg-gradient-to-b dark:from-dark-theme">
      <div className="container mx-auto mt-10 px-2 md:px-5 lg:max-w-6xl">
        {/* Heading Section */}
        <Heading
          title={"Popular Insights"}
          subTitle={
            "Discover insights through the latest analysis to enhance your knowledge from our expert contributors."
          }
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-16 lg:grid-cols-3">
          {blogs?.map((insights, index) => (
            <InsightsCard key={index} insights={insights} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularInsights;
