"use client";

import CategoryForm from "@/components/shared/CategoryForm";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getCategory } from "@/lib/actions/category.action";
import { createCourse, updateCourse } from "@/lib/actions/course.action";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUp } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(100, { message: "Title must be at most 100 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  category: z.string().min(1, { message: "Category is required." }), // Category ID
  thumbnail: z.string().url({ message: "Thumbnail must be a valid URL." }),
  language: z
    .string()
    .min(2, { message: "Language must be at least 2 characters." }),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    errorMap: () => ({
      message: "Level must be Beginner, Intermediate, or Advanced.",
    }),
  }),
  discount: z
    .number()
    .min(0, { message: "Discount must be at least 0%." })
    .max(100, { message: "Discount cannot exceed 100%." })
    .optional(),
  price: z.number().min(0, { message: "Price must be at least 0." }),
  duration: z
    .number()
    .min(0, { message: "Duration must be at least 0 hours." })
    .optional(),
});

export default function CourseForm({ course }) {
  const [categories, setCategories] = useState([]);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Get a specific query parameter
  const category = searchParams.get("cq");

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course?.title || "",
      description: course?.description || "",
      category: course?.category?._id || "",
      thumbnail:
        course?.thumbnail ||
        "https://res.cloudinary.com/dbjlihrjj/image/upload/v1744612722/zwu9nokdh0zlwwjrvpa8.jpg",
      language: course?.language || "",
      level: course?.level || "Beginner",
      discount: course?.discount ?? "",
      price: course?.price || "",
      duration: course?.duration || "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    if (course) {
      toast.promise(
        updateCourse({
          courseId: course._id,
          data: values,
          path: "/instructor/courses",
        }),
        {
          loading: "Updating course...",
          success: (data) => {
            router.refresh();
            router.push("/instructor/courses/");
            form.reset();
            return "Course updated!";
          },
          error: (error) => {
            console.error("Error creating course:", error);
            return "Failed to create course.";
          },
        },
        { id: "create-course" },
      );
    } else {
      toast.promise(
        createCourse({ data: values, path: "/instructor/courses" }),
        {
          loading: "Creating course...",
          success: (data) => {
            router.refresh();
            router.push("/instructor/courses");
            form.reset();
            return "Course created successfully!";
          },
          error: (error) => {
            console.error("Error creating course:", error);
            return "Failed to create course.";
          },
        },
        { id: "create-course" },
      );
    }
  }

  //  Get category from server action
  useEffect(() => {
    const fetchCategory = async () => {
      const result = await getCategory(category);
      if (!result) return;
      setCategories(result);
    };

    fetchCategory();
  }, [category]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          className="col-span-1 sm:col-span-2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter course title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <CategoryForm />

                    {/* Map through categories and create SelectItem for each category */}
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                    {/* Example static categories */}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Thumbnail */}
        <div>
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <CldUploadWidget
                    uploadPreset="edu-genius"
                    onSuccess={(result, { widget }) => {
                      // setResource(result?.info); // { public_id, secure_url, etc }
                      form.setValue("thumbnail", result?.info?.secure_url); // Set the thumbnail URL in the form state
                    }}
                  >
                    {({ open }) => {
                      return (
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Upload thumbnail"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="mb-2"
                            disabled
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={open}
                            className="w-fit"
                          >
                            <ImageUp strokeWidth={1} />
                          </Button>
                        </div>
                      );
                    }}
                  </CldUploadWidget>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Language */}
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Input placeholder="Enter course language" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Level */}
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Level</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Discount */}
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter discount percentage"
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter course price"
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (hours)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter course duration"
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-1 sm:col-span-2">
              <FormLabel>Course Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter course description"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="col-span-1 sm:col-span-2"
          disabled={form.formState.isSubmitting}
        >
          {course ? "Update Course" : "Create Course"}
        </Button>
      </form>
    </Form>
  );
}
