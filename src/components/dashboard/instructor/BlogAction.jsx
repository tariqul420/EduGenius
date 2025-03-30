"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import BlogForm from "./BlogForm"; // Import BlogForm

export default function BlogAction({
  blogId,
  userId,
  categories,
  pathname,
  blog,
}) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const handleUpdate = async () => {
    try {
      const result = await getBlogById(blogId); // Fetch blog data if not provided
      if (result.success) {
        setIsUpdateOpen(true); // Open BlogForm
      } else {
        toast.error("Failed to load blog data");
      }
    } catch (error) {
      toast.error("Error fetching blog: " + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBlogById(blogId, pathname || "/instructor/my-blogs");
      toast.success("Blog deleted successfully.");
      setIsDeleteOpen(false);
    } catch (error) {
      toast.error(error?.message || "Failed to delete Blog");
    }
  };

  return (
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer rounded-full text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <DropdownMenuItem
            onClick={handleUpdate}
            className="cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Update
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
              <AlertDialogTrigger asChild>
                <div
                  onClick={() => setIsDeleteOpen(true)}
                  className="flex w-full cursor-pointer items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-md border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-gray-900 dark:text-gray-100">
                    Delete Blog
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-700 dark:text-gray-300">
                    Are you sure you want to delete this blog? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row sm:gap-0">
                  <AlertDialogCancel
                    className="w-full cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-100 sm:w-auto dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setIsDeleteOpen(false)}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      className="w-full cursor-pointer text-white sm:w-auto"
                      variant="destructive"
                      onClick={() => handleDelete(blogId)}
                    >
                      Delete
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Render BlogForm for updating */}
      {isUpdateOpen && (
        <BlogForm
          userId={userId}
          categories={categories}
          pathname={pathname}
          isUpdate={true}
          blog={blog} // Pass the blog data directly
          onOpenChange={setIsUpdateOpen} // Control dialog visibility
        />
      )}
    </TableCell>
  );
}
