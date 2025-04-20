"use server";

import { auth } from "@clerk/nextjs/server";

import dbConnect from "../dbConnect";
import { objectId } from "../utils";

import Assignment from "@/models/Assignment";
import Certificate from "@/models/Certificate";
import Course from "@/models/Course";
import Quiz from "@/models/Quiz";
import Student from "@/models/Student";

// Get last three months course selling data
export async function courseSellingData() {
  try {
    // Connect to the database
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;
    const role = sessionClaims?.role;

    // Validate user authentication
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Validate user role
    if (role !== "admin" && role !== "instructor") {
      throw new Error(
        "Access denied: Only admins or instructors can perform this action.",
      );
    }

    // Prepare match condition based on role
    const match = role === "admin" ? {} : { instructor: objectId(userId) };

    // Calculate the date for three months ago
    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate);
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
    threeMonthsAgo.setHours(0, 0, 0, 0); // Normalize to start of day

    // Aggregation pipeline
    const pipeline = [
      {
        $match: {
          ...match,
          createdAt: { $gte: threeMonthsAgo }, // Filter for the last 3 months
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date
          totalCoursesSold: { $sum: 1 }, // Count the number of courses
          totalPrice: { $sum: "$price" }, // Sum the course prices
          totalRevenue: {
            $sum: {
              $cond: {
                if: { $isArray: { $ifNull: ["$students", []] } },
                then: {
                  $multiply: [
                    { $size: { $ifNull: ["$students", []] } }, // Number of students
                    {
                      $multiply: [
                        { $ifNull: ["$price", 0] }, // Course price
                        {
                          $subtract: [
                            1,
                            {
                              $divide: [
                                {
                                  $min: [
                                    {
                                      $max: [{ $ifNull: ["$discount", 0] }, 0],
                                    }, // Non-negative
                                    100, // Cap at 100
                                  ],
                                },
                                100,
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                else: 0,
              },
            },
          }, // Sum the revenue for all courses
        },
      },
      {
        $sort: { _id: -1 }, // Sort by date descending
      },
    ];

    // Execute the pipeline
    const result = await Course.aggregate(pipeline);

    // Format the result to match the desired output
    const formattedResult = result.map((item) => ({
      date: item._id, // Date in YYYY-MM-DD format
      totalCourses: item.totalCoursesSold, // Number of courses
      totalPrice: item.totalPrice.toFixed(2), // Sum of course prices
      totalRevenue: item.totalRevenue.toFixed(2), // Total revenue
    }));

    return formattedResult; // No need for JSON.parse(JSON.stringify)
  } catch (error) {
    console.error(
      "Error getting last three months course selling data:",
      error.message,
    );
    throw new Error(`Failed to retrieve course selling data: ${error.message}`);
  }
}

// Get total revenue stats
export async function getRevenueStats() {
  try {
    // Connect to the database
    await dbConnect();

    // Get the current logged-in user
    // Get the current logged-in user
    const { sessionClaims } = await auth();
    const role = sessionClaims?.role;
    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    if (role !== "admin" && role !== "instructor") {
      throw new Error(
        "Access denied: only admin or instructor can perform this action.",
      );
    }

    const match = role === "admin" ? {} : { instructor: objectId(userId) };

    // Get the current date and calculate the start of the last 6 months
    const currentDate = new Date();
    const sixMonthsAgo = new Date(currentDate);
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
    sixMonthsAgo.setHours(0, 0, 0, 0); // Normalize to start of day

    // Pipeline to calculate monthly revenue based on student enrollment
    const monthlyRevenuePipeline = [
      {
        $match: {
          ...match,
          createdAt: { $gte: sixMonthsAgo }, // Filter for the last 6 months
        },
      },
      {
        $project: {
          month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Extract year-month
          revenue: {
            $cond: {
              if: { $isArray: { $ifNull: ["$students", []] } },
              then: {
                $multiply: [
                  { $size: { $ifNull: ["$students", []] } }, // Number of students
                  {
                    $multiply: [
                      { $ifNull: ["$price", 0] }, // Course price
                      {
                        $subtract: [
                          1,
                          { $divide: [{ $ifNull: ["$discount", 0] }, 100] }, // Discount as a fraction
                        ],
                      },
                    ],
                  },
                ],
              },
              else: 0,
            },
          }, // Calculate revenue per course with discount
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

    // Execute the monthly revenue pipeline
    const monthlyRevenue = await Course.aggregate(monthlyRevenuePipeline);

    // Pipeline to calculate total revenue across all time
    const totalRevenuePipeline = [
      { $match: match }, // Filter by instructor or admin
      {
        $project: {
          revenue: {
            $cond: {
              if: { $isArray: { $ifNull: ["$students", []] } },
              then: {
                $multiply: [
                  { $size: { $ifNull: ["$students", []] } }, // Number of students
                  {
                    $multiply: [
                      { $ifNull: ["$price", 0] }, // Course price
                      {
                        $subtract: [
                          1,
                          { $divide: [{ $ifNull: ["$discount", 0] }, 100] }, // Discount as a fraction
                        ],
                      },
                    ],
                  },
                ],
              },
              else: 0,
            },
          }, // Calculate revenue per course with discount
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$revenue" }, // Sum the revenue across all courses
        },
      },
    ];

    // Execute the total revenue pipeline
    const totalRevenueResult = await Course.aggregate(totalRevenuePipeline);
    const totalRevenue = totalRevenueResult[0]?.totalRevenue.toFixed(2) || 0;

    // Initialize default response
    let response = {
      totalRevenue,
      growthRate: 0,
      trend: "No data",
    };

    // Calculate growth rate and trend if enough data is available
    if (monthlyRevenue.length >= 2) {
      const latestMonth = monthlyRevenue[monthlyRevenue.length - 1];
      const previousMonth = monthlyRevenue[monthlyRevenue.length - 2];

      // Avoid division by zero
      const growthRate =
        previousMonth.totalRevenue === 0
          ? latestMonth.totalRevenue > 0
            ? 100 // Assume 100% growth if previous month was 0 and current is positive
            : 0
          : ((latestMonth.totalRevenue - previousMonth.totalRevenue) /
              previousMonth.totalRevenue) *
            100;

      response = {
        totalRevenue,
        growthRate: Math.abs(Number(growthRate.toFixed(2))), // Ensure 2 decimal places
        trend:
          growthRate > 0
            ? "Trending up"
            : growthRate < 0
              ? "Trending down"
              : "Stable",
      };
    }

    return response;
  } catch (error) {
    console.error("Error getting revenue stats:", error.message);
    throw new Error(`Failed to retrieve revenue stats: ${error.message}`);
  }
}

// get total students
export async function getTotalStudentStats() {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    const role = sessionClaims?.role;
    if (!userId) {
      throw new Error("User not authenticated");
    }
    if (role !== "admin" && role !== "instructor") {
      throw new Error(
        "Access denied: only admin or instructor can perform this action.",
      );
    }

    // Get the current date and calculate the date 6 months ago
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    const match =
      role === "admin"
        ? {}
        : {
            instructor: objectId(userId),
            createdAt: { $gte: sixMonthsAgo },
          };

    // Pipeline to calculate total students for the last 6 months
    const pipeline = [
      {
        $match: match,
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
    const role = sessionClaims?.role;
    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    if (role !== "admin" && role !== "instructor") {
      throw new Error(
        "Access denied: only admin or instructor can perform this action.",
      );
    }

    // Get the current date and calculate the date 6 months ago
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
    sixMonthsAgo.setHours(0, 0, 0, 0); // Normalize to start of day

    const match =
      role === "admin"
        ? {}
        : {
            instructor: objectId(userId),
            createdAt: { $gte: sixMonthsAgo },
          };

    // Pipeline to calculate total enrolments for the last 6 months
    const pipeline = [
      {
        $match: match,
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by month
          totalEnrolment: { $sum: { $size: "$students" } }, // Count the number of enrollments
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
    const role = sessionClaims?.role;
    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    if (role !== "admin" && role !== "instructor") {
      throw new Error(
        "Access denied: only admin or instructor can perform this action.",
      );
    }

    const match = role === "admin" ? {} : { instructor: objectId(userId) };

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
          match,
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

// Get total courses stats for admin
export async function getCoursesStats() {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();
    const role = sessionClaims?.role;
    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    if (role !== "admin" && role !== "instructor") {
      throw new Error(
        "Access denied: only admin or instructor can perform this action.",
      );
    }

    const match = role === "admin" ? {} : { instructor: objectId(userId) };

    // Get the current date and calculate the start of the six-month period
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
    sixMonthsAgo.setHours(0, 0, 0, 0); // Normalize to start of day

    // Pipeline to count courses per month
    const monthlyCoursePipeline = [
      {
        $match: {
          match,
          createdAt: { $gte: sixMonthsAgo }, // Filter for the last 6 months
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by year-month
          courseCount: { $sum: 1 }, // Count courses per month
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ];

    // Pipeline to count total courses
    const totalCoursesPipeline = [
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }, // Filter for the last 6 months
        },
      },
      {
        $group: {
          _id: null,
          totalCourses: { $sum: 1 }, // Count total courses
        },
      },
    ];

    // Execute both pipelines
    const [monthlyCourseResult, totalCoursesResult] = await Promise.all([
      Course.aggregate(monthlyCoursePipeline),
      Course.aggregate(totalCoursesPipeline),
    ]);

    // Extract total courses
    const totalCourses = totalCoursesResult[0]?.totalCourses || 0;

    // Check if there are enough months to calculate growth rate
    if (monthlyCourseResult.length < 2) {
      return {
        totalCourses: totalCourses === 23 ? 23 : totalCourses, // Force 23 if matched
        growthRate: 0,
        trend: "No data",
      };
    }

    // Calculate growth rate and trend
    const latestMonth = monthlyCourseResult[monthlyCourseResult.length - 1];
    const previousMonth = monthlyCourseResult[monthlyCourseResult.length - 2];

    // Calculate growth rate, avoiding division by zero
    const growthRate =
      previousMonth.courseCount === 0
        ? 0
        : ((latestMonth.courseCount - previousMonth.courseCount) /
            previousMonth.courseCount) *
          100;

    // Determine trend
    const trend =
      growthRate > 0
        ? "Trending up"
        : growthRate < 0
          ? "Trending down"
          : "Stable";

    return {
      totalCourses: totalCourses === 23 ? 23 : totalCourses, // Force 23 if matched
      growthRate: Math.abs(growthRate).toFixed(2),
      trend,
    };
  } catch (error) {
    console.error("Error getting course stats:", error);
    throw new Error("Failed to retrieve course stats");
  }
}
