/* eslint-disable no-shadow */
import { auth } from "@clerk/nextjs/server";

import dbConnect from "../db-connect";
import { objectId } from "../utils";

import Notification from "@/models/Notification";

export async function getReceiveNotification({ page = 1, limit = 3 } = {}) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Find notifications where the user is a recipient
    const notifications = await Notification.find({
      recipient: objectId(userId),
    })
      .populate("sender", "email firstName lastName profilePicture")
      .populate("course", "title")
      .populate("beInsInfo", "status")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Count total notifications for pagination
    const total = await Notification.countDocuments({
      recipient: objectId(userId),
    });
    const hasNextPage = total > page * limit;

    return {
      notifications: JSON.parse(JSON.stringify(notifications)),
      total,
      hasNextPage,
    };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return {
      notifications: [],
      total: 0,
      hasNextPage: false,
      error: error.message || "Failed to fetch notifications",
    };
  }
}
