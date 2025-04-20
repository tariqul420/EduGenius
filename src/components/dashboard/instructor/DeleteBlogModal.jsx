import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteBlogById } from "@/lib/actions/blog.action";

export default function DeleteBlogModal({ blogId }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      toast.promise(deleteBlogById(blogId), {
        loading: "Blog deleting...",
        success: () => {
          router.refresh();
          return "Blog Delete successfully!";
        },
        error: (err) => {
          return "Error delete blog. Please try again.";
        },
      });

      setOpen(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        className="w-full text-left"
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            Delete Blog
          </DialogTitle>
          <DialogDescription className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this blog? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button className="ml-4" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
