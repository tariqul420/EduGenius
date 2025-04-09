"use server";

import Certificate from "@/models/Certificate";
import mongoose from "mongoose";
import dbConnect from "../dbConnect";

export async function getCertificateByStudent({
  studentId,
  page = 1,
  limit = 6,
}) {
  try {
    await dbConnect();

    // Validate studentId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return { certificate: [], total: 0, hasNextPage: false };
    }

    // Convert string ID to ObjectId
    const objectId = new mongoose.Types.ObjectId(studentId);

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Find certificate with pagination
    const certificate = await Certificate.find({ student: objectId })
      .populate("student", "firstName lastName")
      .populate({
        path: "course",
        select: "title instructor",
        populate: { path: "instructor", select: "firstName lastName" },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await Certificate.countDocuments({ student: objectId });
    // const hasNextPage = skip + certificate.length < total;
    const hasNextPage = total > limit * page;

    return {
      certificate: JSON.parse(JSON.stringify(certificate)),
      total,
      hasNextPage,
    };
  } catch (error) {
    console.error("Error fetching certificate by student:", error);
    return { certificate: [], total: 0, hasNextPage: false };
  }
}
