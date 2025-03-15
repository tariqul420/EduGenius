import Heading from "@/components/shared/Heading";
import InsightsCard from "./InsightsCard";

const PopularInsights = () => {
    const data = [
        {
            image: "https://faculty.spagreen.net/demo/public/images/20230813190506image_406x240-418.png",
            date: "15 Mar 2025",
            title: "How to Use Behavioral Data to Master Your Marketing Strategy",
            desc: "While the virtual world brings plenty of challenges, it also provides new and continually evolving opportunities for innovative marketing tactics – and there are golden nuggets hidden in the vast digital lakes of consumer data. The heart and soul of customer behavior hides beneath all the ones and zeros.It’s not enough to observe this data – you must decode it and turn it into actionable insights.We’re here to walk you through the basics of using behavioral data in marketing.",
            commentNum: 1,
            name: "Mr John"
        },
        {
            image: "https://faculty.spagreen.net/demo/public/images/20230816071223image_406x240-211.png",
            date: "15 Mar 2025",
            title: "What’s New on Envato Elements? From Curated Collections to Suggested Music Tracks",
            desc: "At Envato, we’re always looking to level up our products to provide the best possible experience for our users. In order to evolve Envato Elements into the best possible tool for creatives everywhere, keeping up with the latest tools, technologies, and features is key. In this blog post, we’re keeping you up to date on all the latest product updates, features, and functionalities Envato Elements has to offer so you can stay ahead of the curve and streamline your creative process.",
            commentNum: 0,
            name: "By Admin"
        },
        {
            image: "https://faculty.spagreen.net/demo/public/images/20230816071340image_406x240-67.png",
            date: "15 Mar 2025",
            title: "Mockup Trends for 2023: From Floating Objects to Social Media Moodboards",
            desc: "Design mockups are the ultimate canvas for designers to iterate ideas, pressure-test products, and visualize their design concepts. From sleek, sophisticated stationery to professional product packaging, mockups offer endless possibilities for presenting professional design concepts, becoming indispensable tools for designers and marketers alike. Whether you’re a seasoned designer seeking fresh inspiration or an aspiring creative looking to stay ahead of the curve, we’re here to help you unpack the ten hottest mockup trends of the moment. Let’s dive in! ",
            commentNum: 2,
            name: "Mr John"
        },
    ];

    return (
        <div className="mt-20 container mx-auto lg:max-w-6xl">
            {/* Heading Section */}
            <Heading title={`Popular Insights`} subTitle={`Discover insights through the latest analysis to enhance your knowledge from our expert contributors.`} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    data?.map((insights, index) => <InsightsCard key={index} insights={insights} />)
                }
            </div>
        </div>
    );
};

export default PopularInsights;