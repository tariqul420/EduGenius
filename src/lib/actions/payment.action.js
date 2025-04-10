 import payment from "@/models/payment";
import dbConnect from "../dbConnect";
import mongoose from "mongoose";

export async function savePayment({ course, path, student, transactionId }) {
  try {
    await dbConnect();

    const paymentInfo = {
      ...transactionId,
      student: new mongoose.Types.ObjectId(student),
      course: new mongoose.Types.ObjectId(course),
    };

    await payment.create(paymentInfo);

    if (path) {
      revalidatePath(path);
    }

    return { success: true };
  } catch (error) {
    console.error("Something is Wrong", error);
    return {
      success: false,
      error: error.message || "Failed to Payment",
    };
  }
}
