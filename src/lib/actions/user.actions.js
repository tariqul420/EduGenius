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

export async function updateUser(clerkId, user) {
  try {
    await dbConnect();
    return await User.findOneAndUpdate({ clerkUserId: clerkId }, user, {
      new: true,
    });
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

export async function deleteUser(clerkId) {
  try {
    await dbConnect();
    const user = await User.findOne({ clerkUserId: clerkId });

    if (!user) {
      console.error("Error deleting user:", error);
    }

    await User.deleteOne({ _id: user._id });
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
