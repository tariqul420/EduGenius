"use server";
import Category from "@/models/Category";
import Transaction from "@/models/Transaction";
import User from "@/models/User";

export async function createUser(user) {
  try {
    const newUser = new User(user);
    return await newUser.save();
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(clerkId, user) {
  try {
    return await User.findOneAndUpdate({ clerkId }, user, { new: true });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(clerkId) {
  try {
    // Find user to delete
    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Unlink relationships
    await Category.deleteMany({ userId: user._id });
    await Transaction.deleteMany({ userId: user._id });
    await User.deleteOne({ _id: user._id });
  } catch (error) {
    console.log(error);
  }
}
