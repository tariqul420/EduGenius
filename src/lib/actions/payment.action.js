"use server";
import Payment from "@/models/Payment";
import { auth } from "@clerk/nextjs/server";
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

    return JSON.parse(JSON.stringify(paymentIntent));
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return {
      success: false,
      error: error.message || "Failed to create payment intent",
    };
  }
}

export async function savePayment({ paymentData }) {
  try {
    await dbConnect();
    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const paymentInfo = {
      ...paymentData,
      student: objectId(userId),
      course: objectId(paymentData.course),
    };

    // Check if payment already exists for this student and course
    const existingPayment = await Payment.findOne({
      student: paymentInfo.student,
      course: paymentInfo.course,
    });

    if (existingPayment) {
      return JSON.parse(
        JSON.stringify({
          status: 400,
          message: "Student already enrolled in this course",
        }),
      );
    }

    // If no existing payment found, create new one
    const newPayment = Payment(paymentInfo);
    await newPayment.save();

    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "Payment successful",
        data: newPayment,
      }),
    );
  } catch (error) {
    console.error("Something is Wrong", error);
    return {
      success: false,
      error: error.message || "Failed to process payment",
    };
  }
}
