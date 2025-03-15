"use server";

import User from "@/models/User";
import dbConnect from "../dbConnect";

export async function createUser(user) {
  try {
    await dbConnect();
    const newUser = new User(user);
    return await newUser.save();
  } catch (error) {
    // console.log(error);
  }
}

export async function updateUser(clerkId, user) {
  try {
    await dbConnect();
    return await User.findOneAndUpdate({ clerkId }, user, { new: true });
  } catch (error) {
    // console.log(error);
  }
}

export async function deleteUser(clerkId) {
  try {
    await dbConnect();
    // Find user to delete
    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Unlink relationships
    // await Category.deleteMany({ userId: user._id });
    // await Transaction.deleteMany({ userId: user._id });
    await User.deleteOne({ _id: user._id });
  } catch (error) {
    // console.log(error);
  }
}

// export async function getUserByClerkId() {
//   try {
//     await dbConnect();
//     return await User.find({});
//   } catch (error) {
//     console.log(error);
//   }
// }
