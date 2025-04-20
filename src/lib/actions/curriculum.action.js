"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import dbConnect from "../dbConnect";
import { objectId } from "../utils";

import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import Module from "@/models/Module";

// Server action for adding course curriculum
export async function addCourseCurriculum({ courseId, data, path }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const courseModule = await Module.create({
      name: data.name,
      course: objectId(courseId),
    });

    if (!courseModule) {
      throw new Error("Failed to create course module");
    }

    const lessons = data.lessons.map((lesson) => ({
      ...lesson,
      course: objectId(courseId),
      module: courseModule._id,
    }));
    await Lesson.insertMany(lessons);

    revalidatePath(path);
    return JSON.parse(JSON.stringify(courseModule));
  } catch (error) {
    console.error("Error adding course curriculum:", error);
    throw error;
  }
}

export async function getCourseCurriculum(courseId) {
  try {
    await dbConnect();

    const courseCurriculum = await Module.aggregate([
      {
        $match: { course: objectId(courseId) }, // Match modules for the given course
      },
      {
        $lookup: {
          from: "lessons", // Join with the lessons collection
          localField: "_id", // Match module ID
          foreignField: "module", // Match lessons by module ID
          as: "lessons", // Output lessons as an array
        },
      },
      {
        $project: {
          _id: 1, // Include module ID
          name: 1, // Include module name
          createdAt: 1, // Include module creation date
          updatedAt: 1, // Include module update date
          lessons: {
            $map: {
              input: "$lessons", // Iterate over lessons
              as: "lesson",
              in: {
                _id: "$$lesson._id", // Include lesson ID
                title: "$$lesson.title", // Include lesson title
                videoUrl: "$$lesson.videoUrl", // Include lesson video URL
                isFinished: "$$lesson.isFinished", // Include lesson completion status
                createdAt: "$$lesson.createdAt", // Include lesson creation date
                updatedAt: "$$lesson.updatedAt", // Include lesson update date
              },
            },
          },
        },
      },
    ]);

    const objCourseCurriculum = courseCurriculum[0] || {};
    return JSON.parse(JSON.stringify(objCourseCurriculum));
  } catch (error) {
    console.error("Error getting course curriculum:", error);
    throw error;
  }
}

export async function updateCourseCurriculum({
  courseId,
  moduleId,
  data,
  path,
}) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Update module name
    await Module.findOneAndUpdate(
      { _id: objectId(moduleId) },
      { name: data.name },
      { new: true },
    );

    // Handle existing lessons updates
    const existingLessons = data.lessons.filter((lesson) => lesson._id);
    for (const lesson of existingLessons) {
      await Lesson.findByIdAndUpdate(lesson._id, {
        title: lesson.title,
        videoUrl: lesson.videoUrl,
        module: objectId(moduleId),
        course: objectId(courseId),
      });
    }

    // Handle new lessons creation
    const newLessons = data.lessons.filter((lesson) => !lesson._id);
    if (newLessons.length > 0) {
      const lessonsToCreate = newLessons.map((lesson) => ({
        title: lesson.title,
        videoUrl: lesson.videoUrl,
        module: objectId(moduleId),
        course: objectId(courseId),
        isFinished: false,
      }));

      await Lesson.insertMany(lessonsToCreate);
    }

    revalidatePath(path);
    return { success: true };
  } catch (error) {
    console.error("Error updating course curriculum:", error);
    throw error;
  }
}

export async function deleteCurriculumLesson({ lessonId, path }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }
    await Lesson.findOneAndDelete({ _id: lessonId });
    revalidatePath(path);
    return { success: true };
  } catch (error) {
    console.error("Error deleting course curriculum:", error);
  }
}
export async function deleteCurriculumModule({ curriculumId, path }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }
    await Module.findOneAndDelete({ _id: curriculumId });
    revalidatePath(path);
    return { success: true };
  } catch (error) {
    console.error("Error deleting course curriculum:", error);
  }
}

export async function getModules({ slug }) {
  try {
    await dbConnect();

    const { _id } = await Course.findOne({ slug });

    const courseCurriculum = await Module.aggregate([
      {
        $match: { course: _id }, // Match modules for the given course
      },
      {
        $lookup: {
          from: "lessons", // Join with the lessons collection
          localField: "_id", // Match module ID
          foreignField: "module", // Match lessons by module ID
          as: "lessons", // Output lessons as an array
        },
      },
      {
        $project: {
          _id: 1, // Include module ID
          name: 1, // Include module name
          createdAt: 1, // Include module creation date
          updatedAt: 1, // Include module update date
          lessons: {
            $map: {
              input: "$lessons", // Iterate over lessons
              as: "lesson",
              in: {
                _id: "$$lesson._id", // Include lesson ID
                title: "$$lesson.title", // Include lesson title
                videoUrl: "$$lesson.videoUrl", // Include lesson video URL
                slug: "$$lesson.slug", // Include lesson completion status
                createdAt: "$$lesson.createdAt", // Include lesson creation date
                updatedAt: "$$lesson.updatedAt", // Include lesson update date
              },
            },
          },
        },
      },
    ]);

    const objCourseCurriculum = courseCurriculum[0] || {};
    return JSON.parse(JSON.stringify(objCourseCurriculum));
  } catch (error) {
    console.error("Error getting course curriculum:", error);
    throw error;
  }
}

export async function getLesson({ id }) {
  console.log("getLesson", objectId(id));
  try {
    await dbConnect();

    const lesson = await Lesson.findById(objectId(id));
    if (!lesson) {
      throw new Error("Lesson not found");
    }
    return JSON.parse(JSON.stringify(lesson));
  } catch (error) {
    console.error("Error getting lesson:", error);
    throw error;
  }
}
