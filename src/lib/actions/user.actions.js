"use server";

import User from "@/models/User";
import dbConnect from "../dbConnect";

export async function createUser(user) {
  try {
    await dbConnect();
    const newUser = new User(user);
    return await newUser.save();
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function updateUser(clerkUserId, user) {
  try {
    await dbConnect();
    return await User.findOneAndUpdate({ clerkUserId }, user, {
      new: true,
    });
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

export async function deleteUser(clerkUserId) {
  try {
    await dbConnect();
    await User.deleteOne({ clerkUserId });
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
