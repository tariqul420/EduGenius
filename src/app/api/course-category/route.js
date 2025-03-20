// app/api/coursecategory/route.js
import { NextResponse } from "next/server"; // Import NextResponse
import dbConnect from "@/lib/dbConnect"; // Ensure this is the correct path
import Course from "@/models/Course"; // Ensure this is the correct path

export async function GET() {
    await dbConnect(); // Connect to the database

    try {
        // Aggregation pipeline to fetch unique categories
        const courseCategory = await Course.aggregate([
            {
                $lookup: {
                    from: "categories", // Join with the "categories" collection
                    localField: "category", // Field in the Course collection
                    foreignField: "_id", // Field in the Category collection
                    as: "categoryDetails", // Store the joined data in "categoryDetails"
                },
            },
            {
                $unwind: "$categoryDetails", // Unwind the joined array (one-to-one relationship)
            },
            {
                $group: {
                    _id: "$categoryDetails._id", // Group by category ID
                    name: { $first: "$categoryDetails.name" }, // Get the category name
                    slug: { $first: "$categoryDetails.slug" }, // Get the category slug
                },
            },
            {
                $project: {
                    _id: 0, // Exclude the category ID
                    name: 1, // Include the category name
                    slug: 1, // Include the category slug
                },
            },
        ]);

        // Return the unique categories as a JSON response
        return NextResponse.json(courseCategory, { status: 200 });
    } catch (err) {
        console.error(err);

        // Return an error response
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}