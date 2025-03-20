"use server";
import Category from "@/models/Category";
import dbConnect from "../dbConnect";

export async function getCategory() {
    try {
        await dbConnect();
        const category = await Category.find();
        return category;
    } catch (error) {
        console.error("Error creating user:", error);
    }
}
