"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Dummy categories array
const dummyCategories = [
  { _id: "1", name: "Technology" },
  { _id: "2", name: "Lifestyle" },
  { _id: "3", name: "Travel" },
  { _id: "4", name: "Food" },
  { _id: "5", name: "Health" },
];

// Define the schema using Zod based on your Mongoose blogSchema
const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must not exceed 200 characters")
    .trim(),
  content: z.string().min(1, "Content is required"),
  thumbnail: z
    .string()
    .trim()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal("")),
  category: z.string().min(1, "Please select a category"),
});

export default function AddBlog() {
  const { user, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  // Initialize the form with react-hook-form and Zod
  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      category: "",
    },
  });

  const handleSubmit = async (data) => {
    try {
      const blogData = {
        ...data,
        author: user?.id,
      };
      console.log("Blog data:", blogData);
      // Here you would typically make an API call to save the blog
      // await createBlog(blogData);

      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Failed to create blog:", error);
    }
  };

  return (
    <div className="dark:bg-dark-bg rounded-lg bg-white p-4 shadow">
      <div className="flex items-center gap-3">
        {isLoaded && user ? (
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image
              src={user?.imageUrl}
              alt={user?.fullName || "User avatar"}
              fill
              sizes="40px"
              className="rounded-full object-cover"
              priority={false}
              quality={75}
            />
          </div>
        ) : (
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-[#181717a4]" />
        )}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button
              className="dark:text-medium-bg flex-1 cursor-pointer rounded-full bg-gray-100 px-4 py-2 text-left text-gray-500 dark:bg-[#181717a4]"
              onClick={() => setIsOpen(true)}
            >
              What's on your mind?
            </button>
          </DialogTrigger>
          <DialogContent className="dark:bg-dark-bg bg-white sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100">
                Create a New Blog
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="mt-4 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your blog title"
                          className="bg-white text-gray-900 dark:bg-[#181717a4] dark:text-gray-100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Content
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your blog content here..."
                          className="min-h-[200px] resize-y bg-white text-gray-900 dark:bg-[#181717a4] dark:text-gray-100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Thumbnail URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter thumbnail URL (optional)"
                          type="url"
                          className="bg-white text-gray-900 dark:bg-[#181717a4] dark:text-gray-100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Category
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-white text-gray-900 dark:bg-[#181717a4] dark:text-gray-100">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dummyCategories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      form.reset();
                    }}
                    className="cursor-pointer border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isLoaded || form.formState.isSubmitting}
                    className="bg-main hover:bg-main/70 cursor-pointer text-white"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      "Publish"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
