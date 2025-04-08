"use client";

import CategoryForm from "@/components/shared/CategoryForm";
import DialogModal from "@/components/shared/DialogModal";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(100, { message: "Title must be at most 100 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  instructor: z.string().min(1, { message: "Instructor is required." }), // Instructor ID
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

const categorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required." }),
  description: z.string().optional(),
});

export default function CourseForm() {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      instructor: "",
      category: "",
      thumbnail: "",
      language: "",
      level: "Beginner",
      discount: 0,
      price: 0,
      duration: 0,
    },
  });

  const categoryForm = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  function onCategorySubmit(values) {
    // Do something with the category values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <DialogModal title="Create Course" buttonTitle="Create Course">
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
                      <CategoryForm
                        onSubmit={(values) => {
                          console.log("New Category:", values);
                          // Add logic to handle the new category
                        }}
                      />

                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thumbnail */}
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter thumbnail URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
          <Button type="submit" className="col-span-1 sm:col-span-2">
            Submit
          </Button>
        </form>
      </Form>
    </DialogModal>
  );
}
