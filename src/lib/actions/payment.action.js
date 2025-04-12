"use server";
import Payment from "@/models/Payment";
import Student from "@/models/Student";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";
import dbConnect from "../dbConnect";
import { objectId } from "../utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function savePaymentIntent({ amount, currency, metadata }) {
  try {
    // Validate input
    if (!amount || !currency) {
      return {
        success: false,
        error: "Amount and currency are required",
      };
    }

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: currency.toLowerCase(),
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return {
      success: false,
      error: error.message || "Failed to create payment intent",
    };
  }
}

export async function savePayment({ paymentData, path }) {
  try {
    await dbConnect();

    const paymentInfo = {
      ...paymentData,
      student: objectId(paymentData.student),
      course: objectId(paymentData.course),
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

    // Update or create the Student document
    await Student.findOneAndUpdate(
      { studentId: objectId(paymentInfo.student) }, // Find the student by their ID
      { $addToSet: { courses: objectId(paymentInfo.course) } }, // Add the course to the courses array if it doesn't already exist
      { upsert: true, new: true }, // Create a new document if it doesn't exist, and return the updated document
    );

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
