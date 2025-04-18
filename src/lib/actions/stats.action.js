"use server";

import Assignment from "@/models/Assignment";
import Certificate from "@/models/Certificate";
import Course from "@/models/Course";
import Quiz from "@/models/Quiz";
import Student from "@/models/Student";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "../dbConnect";
import { objectId } from "../utils";

// get last three months course selling data
export async function courseSellingData() {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const pipeline = [
      { $match: { instructor: objectId(userId) } }, // Filter by instructor ID
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date
          totalCoursesSold: { $sum: 1 }, // Count the number of courses sold
          totalPrice: { $sum: "$price" }, // Sum the course prices
        },
      },
      {
        $sort: { _id: -1 }, // Sort by date descending
      },
    ];

    const result = await Course.aggregate(pipeline);

    // Format the result to match the desired output
    const formattedResult = result.map((item) => ({
      date: item._id, // Date
      totalCoursesSold: item.totalCoursesSold,
      totalPrice: item.totalPrice,
    }));

    return JSON.parse(JSON.stringify(formattedResult));
  } catch (error) {
    console.error(
      "Error getting last three months course selling data:",
      error,
    );
    throw error;
  }
}

// get total revenue
export async function getRevenueStats() {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Get the current date and calculate the start of the current and previous months
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    // Pipeline to calculate total revenue based on student enrollment
    const pipeline = [
      {
        $match: {
          instructor: objectId(userId), // Filter by instructor ID
          createdAt: { $gte: sixMonthsAgo }, // Filter for the last 6 months
        },
      },
      {
        $project: {
          month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Extract the month
          revenue: { $multiply: [{ $size: "$students" }, "$price"] }, // Calculate revenue per course
        },
      },
      {
        $group: {
          _id: "$month", // Group by month
          totalRevenue: { $sum: "$revenue" }, // Sum the revenue for each month
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ];

    const result = await Course.aggregate(pipeline);

    // Calculate total revenue across all months
    const totalRevenuePipeline = [
      { $match: { instructor: objectId(userId) } }, // Filter by instructor ID
      {
        $project: {
          revenue: { $multiply: [{ $size: "$students" }, "$price"] }, // Calculate revenue per course
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$revenue" }, // Sum the revenue across all courses
        },
      },
    ];

    const totalRevenueResult = await Course.aggregate(totalRevenuePipeline);
    const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;

    // Ensure we have at least two months of data to calculate growth
    if (result.length < 2) {
      return {
        totalRevenue,
        growthRate: 0,
        trend: "No data",
      };
    }

    // Get the most recent month and the previous month
    const latestMonth = result[result.length - 1];
    const previousMonth = result[result.length - 2];

    // Calculate the growth rate
    const growthRate =
      ((latestMonth.totalRevenue - previousMonth.totalRevenue) /
        previousMonth.totalRevenue) *
      100;

    // Determine the trend
    const trend = growthRate > 0 ? "Trending up" : "Trending down";

    return {
      totalRevenue,
      growthRate: Math.abs(growthRate.toFixed(2)), // Return absolute value with 2 decimal places
      trend,
    };
  } catch (error) {
    console.error("Error getting revenue stats:", error);
    throw error;
  }
}

// get total students
export async function getTotalStudentStats() {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Get the current date and calculate the date 6 months ago
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    // Pipeline to calculate total students for the last 6 months
    const pipeline = [
      {
        $match: {
          instructor: objectId(userId), // Filter by instructor ID
          createdAt: { $gte: sixMonthsAgo }, // Filter for the last 6 months
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by month
          totalStudents: { $sum: { $size: "$students" } }, // Count the number of students
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ];

    const result = await Course.aggregate(pipeline);

    // Calculate total students for the last 6 months
    const totalStudents = result.reduce(
      (sum, month) => sum + month.totalStudents,
      0,
    );

    // Calculate growth rate (compare the last two months)
    let growthRate = 0;
    let trend = "No data";

    if (result.length >= 2) {
      const latestMonth = result[result.length - 1];
      const previousMonth = result[result.length - 2];

      growthRate =
        ((latestMonth.totalStudents - previousMonth.totalStudents) /
          previousMonth.totalStudents) *
        100;

      trend = growthRate > 0 ? "Up" : "Down";
    }

    // // Format the result
    // const formattedResult = result.map((item) => ({
    //   month: item._id, // Month (e.g., "2025-04")
    //   totalStudents: item.totalStudents, // Total students for the month
    // }));

    return {
      totalStudents,
      growthRate: Math.abs(growthRate.toFixed(2)), // Return absolute value with 2 decimal places
      trend,
      // monthlyStudents: formattedResult, // Students for each of the last 6 months
    };
  } catch (error) {
    console.error("Error getting total student stats:", error);
    throw error;
  }
}

// get total enrolment
export async function getTotalEnrolmentStats() {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Get the current date and calculate the date 6 months ago
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    // Pipeline to calculate total enrolments for the last 6 months
    const pipeline = [
      {
        $match: {
          instructor: objectId(userId), // Filter by instructor ID
          createdAt: { $gte: sixMonthsAgo }, // Filter for the last 6 months
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by month
          totalEnrolment: { $sum: { $size: "$students" } }, // Count the number of enrolments
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ];

    const result = await Course.aggregate(pipeline);

    // Calculate total enrolments for the last 6 months
    const totalEnrolment = result.reduce(
      (sum, month) => sum + month.totalEnrolment,
      0,
    );

    // Calculate growth rate (compare the last two months)
    let growthRate = 0;
    let trend = "No data";

    if (result.length >= 2) {
      const latestMonth = result[result.length - 1];
      const previousMonth = result[result.length - 2];

      growthRate =
        ((latestMonth.totalEnrolment - previousMonth.totalEnrolment) /
          previousMonth.totalEnrolment) *
        100;

      trend =
        growthRate > 0 ? "Strong student retention" : "Poor student retention";
    }

    // Format the result
    // const formattedResult = result.map((item) => ({
    //   month: item._id, // Month (e.g., "2025-04")
    //   totalEnrolment: item.totalEnrolment, // Total enrolments for the month
    // }));

    return {
      totalEnrolment,
      growthRate: Math.abs(growthRate.toFixed(2)), // Return absolute value with 2 decimal places
      trend,
      // monthlyEnrolments: formattedResult, // Enrolments for each of the last 6 months
    };
  } catch (error) {
    console.error("Error getting total enrolment stats:", error);
    throw error;
  }
}

// get growth rate
export async function getGrowthRate() {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Get the current date and calculate the start of the current and previous periods
    const currentDate = new Date();
    const startOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const startOfPreviousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );

    // Pipeline to calculate total enrolments for the last two months
    const pipeline = [
      {
        $match: {
          instructor: objectId(userId), // Filter by instructor ID
          createdAt: { $gte: startOfPreviousMonth }, // Filter for the last two months
        },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $gte: ["$createdAt", startOfCurrentMonth] },
              "current",
              "previous",
            ],
          }, // Group into "current" and "previous" periods
          totalEnrolment: { $sum: { $size: "$students" } }, // Count the number of enrolments
        },
      },
    ];

    const result = await Course.aggregate(pipeline);

    // Extract current and previous enrolments
    const currentEnrolment =
      result.find((item) => item._id === "current")?.totalEnrolment || 0;
    const previousEnrolment =
      result.find((item) => item._id === "previous")?.totalEnrolment || 0;

    // Calculate growth rate
    let growthRate = 0;
    let trend = "No data";

    if (previousEnrolment > 0) {
      growthRate =
        ((currentEnrolment - previousEnrolment) / previousEnrolment) * 100;
      trend = growthRate > 0 ? "increase" : "decrease";
    }

    return {
      currentEnrolment,
      previousEnrolment,
      growthRate: Math.abs(growthRate.toFixed(2)), // Return absolute value with 2 decimal places
      trend,
    };
  } catch (error) {
    console.error("Error getting growth rate:", error);
    throw error;
  }
}

export async function getStudentDashboardStats() {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();
    const studentId = objectId(sessionClaims?.userId);

    if (!studentId) {
      throw new Error("User not authenticated");
    }

    // Get course count from Student document
    const student = await Student.findOne({ student: studentId });
    const course = student?.courses?.length || 0;

    // Count assignments submitted by student
    const assignment = await Assignment.countDocuments({
      "submissions.student": studentId,
    });

    // Count quizzes in student's enrolled courses
    const quiz = await Quiz.countDocuments({
      course: { $in: student?.courses || [] },
    });

    // Count certificates for student
    const certificate = await Certificate.countDocuments({
      student: studentId,
    });

    return {
      course,
      assignment,
      quiz,
      certificate,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
