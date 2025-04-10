"use server";
import Payment from "@/models/Payment";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";
import dbConnect from "../dbConnect";

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
