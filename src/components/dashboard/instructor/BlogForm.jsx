"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
import ImageUploadCloud from "@/lib/ImageUploadCloud";

// Define the schema using Zod
const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must not exceed 200 characters")
    .trim(),
  content: z.string().min(1, "Content is required"),
  thumbnail: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, "Thumbnail must be a file")
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      "Thumbnail must be an image (JPEG, PNG, or GIF)",
    )
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "File size must be under 5MB",
    ),
  category: z.string().min(1, "Please select a category"),
});

export default function BlogForm({
  userId,
  categories = [],
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
          thumbnail: null, // Initialize as null for updates
          category: blog.category?._id || "",
        }
      : {
          title: "",
          content: "",
          thumbnail: null,
          category: "",
        },
  });

  useEffect(() => {
    if (isUpdate) {
      setIsOpen(true);
    }
  }, [isUpdate]);

  const handleSubmit = async (data) => {
    try {
      let thumbnailUrl = isUpdate ? blog.thumbnail : null;
      if (data.thumbnail instanceof File) {
        thumbnailUrl = await ImageUploadCloud(data.thumbnail); // Assume ImageUploadCloud is async
      }

      const blogData = {
        ...data,
        author: userId,
        slug: data.title.toLowerCase().replace(/\s+/g, "-"),
        thumbnail: thumbnailUrl,
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
        if (!isUpdate) form.reset(); // Reset only for create
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

  const handleOpenChange = (openChange) => {
    setIsOpen(openChange);
    if (onOpenChange) onOpenChange(open);
    if (!openChange && !isUpdate) form.reset(); // Reset only for create on close
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (onOpenChange) onOpenChange(false);
    if (!isUpdate) form.reset(); // Reset only for create
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
              <div className="dark:bg-dark-input h-10 w-10 animate-pulse rounded-full bg-gray-200" />
            )}
            <DialogTrigger asChild>
              <button
                className="dark:text-medium-bg dark:bg-dark-input flex-1 cursor-pointer rounded-full bg-gray-100 px-4 py-2 text-left text-gray-500"
                onClick={() => setIsOpen(true)}
              >
                What&apos;s on your mind?
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
                      className="dark:bg-dark-input bg-white text-gray-900 dark:text-gray-100"
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
                      className="dark:bg-dark-input min-h-[200px] resize-y bg-white text-gray-900 dark:text-gray-100"
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
                      <SelectTrigger className="dark:bg-dark-input w-full bg-white text-gray-900 dark:text-gray-100">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" disabled>
                          No categories available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
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
                    Thumbnail {isUpdate && "(optional)"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="thumbnail"
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0] || null)
                      }
                    />
                  </FormControl>
                  {isUpdate && blog.thumbnail && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Current thumbnail:
                      </p>
                      <Image
                        src={blog.thumbnail}
                        alt="Current thumbnail"
                        width={100}
                        height={100}
                        className="mt-1 rounded"
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={form.formState.isSubmitting}
                className="cursor-pointer text-gray-900 dark:text-gray-100"
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
