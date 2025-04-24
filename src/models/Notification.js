// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: false,
    },
    type: {
      type: String,
      enum: [
        "purchase",
        "instructor_request",
        "status_update",
        "new_course",
        "progress",
      ],
      required: true,
    },
    readBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        readAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// TTL index to delete notifications older than 30 days
notificationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 30 * 24 * 60 * 60 },
);

// Index for fetching notifications by recipient
notificationSchema.index({ recipient: 1, createdAt: -1 });

// Index for readBy queries
notificationSchema.index({ "readBy.user": 1 });

export default mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
