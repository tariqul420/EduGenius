// app/api/coursecategory/route.js
import dbConnect from "@/lib/dbConnect"; // Ensure this is the correct path
import Category from "@/models/Category";
import { NextResponse } from "next/server"; // Import NextResponse

export async function GET() {
    await dbConnect(); // Connect to the database

    try {
        // Aggregation pipeline to fetch unique categories
        const courseCategory = await Category.find();

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