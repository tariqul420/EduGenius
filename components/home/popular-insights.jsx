import InsightsCard from "./insights-card";

import Heading from "@/components/shared/Heading";

const PopularInsights = async ({ blogs }) => {
  return (
    <section className="dark:to-dark-bg dark:from-dark-theme bg-gradient-to-b">
      <div className="container mx-auto mt-10 px-2 md:px-5 lg:max-w-6xl">
        {/* Heading Section */}
        <Heading
          badge={"Trending Now"}
          title={"Popular Insights"}
          subTitle={
            "Stay ahead with cutting-edge industry analysis\nLearn from leading experts in tech and design"
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
