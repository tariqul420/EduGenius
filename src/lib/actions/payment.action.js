"use server";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

import dbConnect from "../dbConnect";
import { objectId } from "../utils";

import Payment from "@/models/Payment";

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

export async function getPaymentHistory({
  page = 1,
  limit = 10,
  search = "",
} = {}) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();
    const role = sessionClaims?.role;
    const studentId = sessionClaims?.userId;

    if (role !== "student") {
      throw new Error("Don't have permission to perform this action!");
    }

    const skip = (page - 1) * limit;

    // Create search match stage
    const searchMatch = search
      ? {
          $match: {
            "course.title": { $regex: search, $options: "i" },
          },
        }
      : { $match: {} };

    // Execute main aggregation for payments
    const payments = await Payment.aggregate([
      // Match payments by student
      {
        $match: {
          student: objectId(studentId),
        },
      },
      // Lookup course data
      {
        $lookup: {                                                                                                        
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course",
        },
      },
      // Unwind course array
      {
        $unwind: "$course",
      },
      // Lookup instructor data
      {
        $lookup: {
          from: "users",
          localField: "course.instructor",
          foreignField: "_id",
          as: "instructor",
        },
      },
      // Unwind instructor array
      {
        $unwind: "$instructor",
      },
      searchMatch,
      // Project only required fields
      {
        $project: {
          transactionId: 1,
          "course.title": 1,
          "course.slug": 1,
          "course.price": 1,
          "course.discount": 1,
          "instructor.firstName": 1,
          "instructor.lastName": 1,
        
        },
      },
      // Pagination
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    // Get total count using aggregation
    const [totalCount] = await Payment.aggregate([
      {
        $match: {
          student: objectId(studentId),
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: "$course",
      },
      searchMatch,
      {
        $count: "total",
      },
    ]);

    const totalPayments = totalCount?.total || 0;
    const totalPages = Math.ceil(totalPayments / limit);

    return JSON.parse(
      JSON.stringify({
        payments,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalPayments,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      }),
    );
  } catch (error) {
    console.error("Error fetching payment history:", error);
    throw new Error("Failed to fetch payment history");
  }
}
