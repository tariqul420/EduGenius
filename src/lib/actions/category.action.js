"use server";
import Category from "@/models/Category";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";

export async function getCategory(categoryParams = "") {
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

export async function getCategories({ page = 1, limit = 10 } = {}) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();
    const role = sessionClaims?.role;

    if (role !== "admin") {
      throw new Error("Don't have permission perform this action!");
    }

    const categories = await Category.find()
      .skip((page - 1) * limit)
      .limit(limit);

    // Get total count using the same match condition
    const totalCategories = await Category.estimatedDocumentCount();

    const totalPages = Math.ceil(totalCategories / limit);

    return JSON.parse(
      JSON.stringify({
        categories,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCategories,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      }),
    );
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw new Error("Failed to fetch assignments");
  }
}

export async function updateCategory(categoryId, categoryName) {
  try {
    await dbConnect();

    const category = await Category.findById(categoryId);

    category.name = categoryName;

    await category.save();

    revalidatePath("/admin/category");
  } catch (error) {
    console.error("Error update category:", error);
    throw error;
  }
}
