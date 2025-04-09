"use server";
import Payment from "@/models/Payment";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";

export async function savePayment({ paymentData, path }) {
  try {
    await dbConnect();

    const paymentInfo = {
      ...paymentData,
      student: new mongoose.Types.ObjectId(paymentData.student),
      course: new mongoose.Types.ObjectId(paymentData.course),
    };

    // Check if payment already exists for this student and course
    const existingPayment = await Payment.findOne({
      student: paymentInfo.student,
      course: paymentInfo.course,
    });

    if (existingPayment) {
      return {
        success: true,
        message: "Student already enrolled in this course",
        data: existingPayment,
      };
    }

    // If no existing payment found, create new one
    const newPayment = await Payment.create(paymentInfo);

    if (path) {
      revalidatePath(path);
    }

    return {
      success: true,
      message: "Payment created successfully",
      data: newPayment,
    };
  } catch (error) {
    console.error("Something is Wrong", error);
    return {
      success: false,
      error: error.message || "Failed to process payment",
    };
  }
}
