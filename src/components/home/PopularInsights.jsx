import Heading from "@/components/shared/Heading";
import InsightsCard from "./InsightsCard";
import Blog from "@/models/Blog";
import dbConnect from "@/lib/dbConnect";

const PopularInsights = async () => {

    await dbConnect();

    const PopularBlog = await Blog.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "authorDetails",
            }
        },
        {
            $unwind: "$authorDetails"
        },
        {
            $project: {
                _id: { $toString: "$_id" },
                title: 1,
                content: 1,
                slug: 1,
                thumbnail: 1,
                createdAt: 1,
                commentCount: { $size: "$comments" },
                authorDetails: 1
            }
        },
        {
            $sort: { commentCount: -1 }
        },
        {
            $limit: 3
        },
        {
            $project: {
                _id: 1,
                title: 1,
                content: 1,
                slug: 1,
                comment: "$commentCount",
                thumbnail: 1,
                createdAt: 1,
                user: {
                    _id: { $toString: "$authorDetails._id" },
                    firstName: "$authorDetails.firstName",
                    lastName: "$authorDetails.lastName"
                }
            }
        }
    ]);

    return (
        <div className="mt-20 container mx-auto lg:max-w-6xl">
            {/* Heading Section */}
            <Heading title={`Popular Insights`} subTitle={`Discover insights through the latest analysis to enhance your knowledge from our expert contributors.`} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    PopularBlog?.map((insights, index) => <InsightsCard key={index} insights={insights} />)
                }
            </div>
        </div>
    );
};

export default PopularInsights;