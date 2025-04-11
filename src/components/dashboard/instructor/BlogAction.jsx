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
import { deleteBlogById } from "@/lib/actions/blog.action";
import { MoreVertical, PenTool, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import BlogForm from "./BlogForm";

export default function BlogAction({
  blogId,
  userId,
  categories,
  pathname,
  blog,
}) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

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
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            className={`cursor-pointer`}
            onClick={() => setIsUpdateOpen(true)}
          >
            <PenTool className="text-dark-bg dark:text-light-bg" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center px-2 py-1.5 text-left text-sm"
                  onClick={() => setIsDeleteOpen(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-md border">
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
                    className="mr-2 w-full cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-100 sm:w-auto dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
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

      {isUpdateOpen && (
        <BlogForm
          userId={userId}
          categories={categories}
          pathname={pathname}
          isUpdate={true}
          blog={blog}
          onOpenChange={setIsUpdateOpen}
        />
      )}
    </TableCell>
  );
}
