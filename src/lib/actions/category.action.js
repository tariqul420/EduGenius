"use server";
import Category from "@/models/Category";
import dbConnect from "../dbConnect";

export async function getCategory({ categoryParams }) {
  try {
    await dbConnect();
    const query = categoryParams ? { name: categoryParams } : {}; // Check if categoryParams exists
    const category = await Category.find(query);
    return JSON.parse(JSON.stringify(category));
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function createCategory(categoryName) {
  try {
    await dbConnect();
    const newCategory = new Category({ name: categoryName });
    const category = await newCategory.save();

    return JSON.parse(JSON.stringify(category));
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}
