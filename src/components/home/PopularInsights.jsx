import Heading from "@/components/shared/Heading";
import InsightsCard from "./InsightsCard";

const PopularInsights = async ({ blogs }) => {

    return (
        <section className="bg-gradient-to-b dark:from-black dark:to-dark-bg">
            <div className="mt-20 container mx-auto px-2 md:px-5 lg:max-w-6xl">
            {/* Heading Section */}
            <Heading title={`Popular Insights`} subTitle={`Discover insights through the latest analysis to enhance your knowledge from our expert contributors.`} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    blogs?.map((insights, index) => <InsightsCard key={index} insights={insights} />)
                }
            </div>
        </div>
        </section>
        
    );
};

export default PopularInsights;