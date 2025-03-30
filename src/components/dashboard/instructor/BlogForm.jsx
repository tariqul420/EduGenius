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
import { createBlog, updateBlog } from "@/lib/actions/blog.action";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Define the schema using Zod with custom URL validation
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
    .min(1, "Thumbnail URL is required")
    .url({ message: "Please enter a valid URL" })
    .refine(
      (url) => {
        const allowedDomains = [
          "pexels.com",
          "images.pexels.com",
          "pixabay.com",
          "cdn.pixabay.com",
          "stocksnap.io",
          "cdn.stocksnap.io",
          "unsplash.com",
          "images.unsplash.com",
        ];
        try {
          const { hostname } = new URL(url);
          return allowedDomains.some(
            (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
          );
        } catch {
          return false;
        }
      },
      {
        message: "URL must be from Pexels, Pixabay, StockSnap, or Unsplash",
      },
    ),
  category: z.string().min(1, "Please select a category"),
});

export default function BlogForm({
  userId,
  categories,
  pathname,
  isUpdate = false,
  blog = {},
  onOpenChange,
}) {
  const { user, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: isUpdate
      ? {
          title: blog.title || "",
          content: blog.content || "",
          thumbnail: blog.thumbnail || "",
          category: blog.category?._id || "",
        }
      : {
          title: "",
          content: "",
          thumbnail: "",
          category: "",
        },
  });

  // Automatically open dialog when isUpdate is true
  useEffect(() => {
    if (isUpdate) {
      setIsOpen(true);
    }
  }, [isUpdate]);

  const handleSubmit = async (data) => {
    try {
      const blogData = {
        ...data,
        author: userId,
        slug: data.title,
      };

      let result;
      if (isUpdate) {
        result = await updateBlog({
          blogId: blog._id,
          blog: blogData,
          path: pathname,
        });
      } else {
        result = await createBlog({ blog: blogData, path: pathname });
      }

      if (result.success) {
        setIsOpen(false);
        if (onOpenChange) onOpenChange(false);
        form.reset();
        toast.success(`Blog ${isUpdate ? "updated" : "created"} successfully!`);
      } else {
        throw new Error(
          result.error || `Failed to ${isUpdate ? "update" : "create"} blog`,
        );
      }
    } catch (error) {
      console.error(`Failed to ${isUpdate ? "update" : "create"} blog:`, error);
      toast.error(
        error.message ||
          `Failed to ${isUpdate ? "update" : "create"} blog. Please try again.`,
      );
    }
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (onOpenChange) onOpenChange(open);
    if (!open) form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* Only show avatar and trigger button when not in update mode */}
      {!isUpdate && (
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
            <DialogTrigger asChild>
              <button
                className="dark:text-medium-bg flex-1 cursor-pointer rounded-full bg-gray-100 px-4 py-2 text-left text-gray-500 dark:bg-[#181717a4]"
                onClick={() => setIsOpen(true)}
              >
                What's on your mind?
              </button>
            </DialogTrigger>
          </div>
        </div>
      )}

      <DialogContent className="dark:bg-dark-bg scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 max-h-[80vh] overflow-y-auto bg-white sm:max-w-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            {isUpdate ? "Update Blog" : "Create a New Blog"}
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
                      placeholder="e.g., from Pexels, Pixabay, Unsplash, or StockSnap"
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full bg-white text-gray-900 dark:bg-[#181717a4] dark:text-gray-100">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
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
                type="submit"
                disabled={!isLoaded || form.formState.isSubmitting}
                className="bg-main hover:bg-main/70 cursor-pointer text-white"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isUpdate ? "Updating..." : "Publishing..."}
                  </>
                ) : isUpdate ? (
                  "Update"
                ) : (
                  "Publish"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
