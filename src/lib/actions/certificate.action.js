"use server";

import Certificate from "@/models/Certificate";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "../dbConnect";
import { objectId } from "../utils";

export async function getCertificateByStudent({ page = 1, limit = 10 } = {}) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();
    const role = sessionClaims?.role;
    const studentId = sessionClaims?.userId;

    if (role !== "student") {
      throw new Error("Don't have permission perform this action!");
    }

    const skip = (page - 1) * limit;

    const certificates = await Certificate.find({
      student: objectId(studentId),
    })
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

    // Get total count using the same match condition
    const totalCertificates = await Certificate.countDocuments({
      student: objectId(studentId),
    });

    const totalPages = Math.ceil(totalCertificates / limit);

    return JSON.parse(
      JSON.stringify({
        certificates,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCertificates,
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
