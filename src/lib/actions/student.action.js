"use server";

import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function updateStudent({ clerkUserId, user, path }) {
  try {
    await dbConnect();
    await User.findOneAndUpdate({ clerkUserId }, user, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.error("Error updating user:", error);
  }
}
