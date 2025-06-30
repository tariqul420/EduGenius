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
  const [openModal, setOpenModal] = useState(false);
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
          throw new Error("Error deleting blog. Please try again.", err);
        },
      });

      setOpenModal(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <Button
        variant="ghost"
        className="w-full text-left"
        onClick={() => setOpenModal(true)}
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
            onClick={() => setOpenModal(false)}
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
