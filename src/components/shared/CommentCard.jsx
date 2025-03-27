"use client";

import { deleteCommentById } from "@/lib/actions/comment.action";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function CommentCard({ comment, path }) {
  const { user, isSignedIn } = useUser();
  const [activeMenu, setActiveMenu] = useState(null);
  const userCommentDate = format(new Date(comment?.createdAt), "MMMM dd, yyyy");

  const clerkEmail = user?.emailAddresses[0]?.emailAddress;

  const handleUpdateComment = (commentId, userId) => {
    // Handle update logic
    setActiveMenu(null);
  };

  const handleDeleteComment = async (commentId, userId) => {
    try {
      // Call API to delete comment
      await deleteCommentById(commentId, userId, path);

      // Show success feedback
      toast.success("Comment deleted successfully");
    } catch (error) {
      console.error("Failed to delete comment:", error);

      // Show error feedback
      toast.error(error?.response?.data?.message || "Failed to delete comment");
    } finally {
      setActiveMenu(null);
    }
  };

  return (
    <div>
      <div className="flex items-start gap-4">
        <Image
          src={comment.user?.profilePicture}
          alt={`${comment.user?.firstName} ${comment.user?.lastName}`}
          width={48}
          height={48}
          className="flex-shrink-0 rounded-full"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-dark-bg dark:text-light-bg font-semibold">
              {comment.user?.firstName} {comment.user?.lastName}
            </h4>
            <span className="text-dark-bg dark:text-light-bg text-xs">•</span>
            <p className="text-dark-bg dark:text-medium-bg text-sm">
              {userCommentDate}
            </p>
          </div>
          <p className="dark:text-light-bg mt-2 text-gray-700">
            {comment.comment}
          </p>
        </div>

        {/* Three-dot menu button */}
        <div className="relative">
          <button
            disabled={!isSignedIn || clerkEmail !== comment?.user?.email}
            onClick={() =>
              setActiveMenu(activeMenu === comment?._id ? null : comment?._id)
            }
            className="cursor-pointer rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <MoreVertical className="text-gray-500 dark:text-gray-400" />
          </button>

          {/* Dropdown menu with animation */}
          {activeMenu === comment?._id && (
            <div className="ring-opacity-5 animate-in fade-in zoom-in-95 absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md border bg-white shadow-lg focus:outline-none dark:bg-gray-800">
              <div className="py-1">
                <button
                  disabled={!isSignedIn || clerkEmail !== comment?.user?.email}
                  onClick={() => handleUpdateComment(comment._id)}
                  className="flex w-full cursor-pointer items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Update comment
                </button>
                <button
                  disabled={!isSignedIn || clerkEmail !== comment?.user?.email}
                  onClick={() =>
                    handleDeleteComment(comment._id, comment.user._id)
                  }
                  className="flex w-full cursor-pointer items-center px-4 py-2 text-sm text-red-600 transition-colors hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
