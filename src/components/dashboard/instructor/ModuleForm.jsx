"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  addCourseCurriculum,
  deleteCurriculumLesson,
  deleteCurriculumModule,
  updateCourseCurriculum,
} from "@/lib/actions/curriculum.action";

import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(100, { message: "Title must be at most 100 characters." }),
  lessons: z.array(
    z.object({
      _id: z.string().optional(),
      title: z
        .string()
        .min(2, { message: "Lesson title must be at least 2 characters." })
        .max(100, { message: "Lesson title must be at most 100 characters." }),
      videoUrl: z.string().url({ message: "Video URL must be a valid URL." }),
    }),
  ),
});

export default function ModuleForm({ curriculum, courseId, slug }) {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: curriculum?.name || "",
      lessons: curriculum?.lessons || [{ id: "", title: "", videoUrl: "" }], // Default to one empty lesson
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lessons", // Name of the dynamic array in the form
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    if (curriculum?.lessons) {
      toast.promise(
        updateCourseCurriculum({
          moduleId: curriculum._id,
          courseId,
          lessonIds: curriculum.lessons.map((lesson) => lesson._id),
          data: values,
          path: `/instructor/courses/${slug}`,
        }),
        {
          loading: "Updating curriculum...",
          success: () => {
            router.push(`/instructor/courses/${slug}`); // Redirect to the courses page
            router.refresh(`/instructor/courses/${slug}`); // Refresh the page to reflect changes

            return "Curriculum updated successfully!";
          },
          error: (err) => {
            console.error(err);
            return "Failed to update curriculum.";
          },
        },
      );
    } else {
      toast.promise(
        addCourseCurriculum({
          courseId,
          data: values,
          path: "/instructor/courses",
        }),
        {
          loading: "Adding curriculum...",
          success: () => {
            router.push(`/instructor/courses/${slug}`); // Redirect to the courses pagepage
            router.refresh(`/instructor/courses/${slug}`); // Refresh the page to reflect changes
            return "Curriculum added successfully!";
          },
          error: (err) => {
            console.error(err);
            return "Failed to add curriculum.";
          },
        },
      );
    }
  }

  function handleDeleteLesson(lessonId, index) {
    try {
      toast.promise(
        deleteCurriculumLesson({
          lessonId: lessonId,
          path: `/instructor/courses/${slug}`,
        }),
        {
          loading: "Deleting curriculum...",
          success: () => {
            router.refresh(`/instructor/courses/${slug}`);
            router.push(`/instructor/courses/${slug}`);
            return "Curriculum Deleted successfully!";
          },
          error: (err) => {
            console.error(err);
            router.refresh(`/instructor/courses/${slug}`);
            router.push(`/instructor/courses/${slug}`);
            return "Failed to Delete curriculum.";
          },
        },
      );
      remove(index);
    } catch (error) {
      console.error("Failed to delete curriculum:", error);
    }
  }

  function handleDeleteModule(curriculumId) {
    try {
      toast.promise(
        deleteCurriculumModule({
          curriculumId: curriculumId,
          path: `/instructor/courses/${slug}`,
        }),
        {
          loading: "Deleting curriculum...",
          success: () => {
            form.reset({
              name: "",
              lessons: [{ id: "", title: "", videoUrl: "" }], // Reset to one empty lesson
            }); // Reset the form after deletion
            router.refresh(`/instructor/courses/${slug}`);
            router.push(`/instructor/courses/${slug}`);
            return "Curriculum Deleted successfully!";
          },
          error: (err) => {
            console.error(err);
            router.refresh(`/instructor/courses/${slug}`);
            router.push(`/instructor/courses/${slug}`);
            return "Failed to Delete curriculum.";
          },
        },
      );
    } catch (error) {
      console.error("Failed to delete curriculum:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8"
      >
        <div className="col-span-2 flex items-end gap-5">
          {/* Module Title */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Module Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter module title"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDeleteModule(curriculum._id)}
            className="w-fit"
          >
            <Minus strokeWidth={1} />
          </Button>
        </div>

        {/* Dynamic Lessons */}
        <div className="col-span-2 space-y-5">
          {fields.map((lesson, index) => (
            <div key={lesson.id} className="flex w-full items-end gap-5">
              {/* Lesson Title */}

              <FormField
                control={form.control}
                name={`lessons.${index}.title`} // Dynamic field name
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Lesson Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter lesson title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Video URL */}
              <FormField
                control={form.control}
                name={`lessons.${index}.videoUrl`} // Dynamic field name
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter video URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Remove Lesson Button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDeleteLesson(lesson._id, index)}
                className="w-fit"
              >
                <Minus strokeWidth={1} />
              </Button>
            </div>
          ))}

          {/* Add Another Lesson Button */}
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ title: "", videoUrl: "" })} // Add a new lesson
            className="mt-4 w-fit"
          >
            <Plus strokeWidth={1} />
            Add another lesson
          </Button>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 sm:col-span-2">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {curriculum?.lessons ? "Update Curriculum" : "Add Curriculum"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
