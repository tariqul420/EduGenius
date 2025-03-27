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
import { deleteCommentById } from "@/lib/actions/comment.action";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function CommentCard({ comment, path }) {
  const { user, isSignedIn } = useUser();
  const [activeMenu, setActiveMenu] = useState(null);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const userCommentDate = format(new Date(comment?.createdAt), "MMMM dd, yyyy");
  const clerkEmail = user?.emailAddresses[0]?.emailAddress;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (
          menuButtonRef.current &&
          !menuButtonRef.current.contains(event.target)
        ) {
          setActiveMenu(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus management when menu opens/closes
  useEffect(() => {
    if (activeMenu === comment?._id && menuRef.current) {
      // Focus the first menu item when menu opens
      menuRef.current.querySelector("button").focus();
    } else if (menuButtonRef.current) {
      // Return focus to menu button when menu closes
      menuButtonRef.current.focus();
    }
  }, [activeMenu, comment?._id]);

  const handleDeleteComment = async (commentId, userId) => {
    try {
      await deleteCommentById(commentId, userId, path);
      toast.success("Comment deleted successfully");
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error(error?.message || "Failed to delete comment");
    } finally {
      setActiveMenu(null);
    }
  };

  return (
    <div className="group relative">
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
            ref={menuButtonRef}
            disabled={!isSignedIn || clerkEmail !== comment?.user?.email}
            onClick={() =>
              setActiveMenu(activeMenu === comment?._id ? null : comment?._id)
            }
            className="cursor-pointer rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-expanded={activeMenu === comment?._id}
            aria-haspopup="true"
            aria-label="Comment options"
          >
            <MoreVertical className="text-gray-500 dark:text-gray-400" />
          </button>

          {/* Dropdown menu */}
          {activeMenu === comment?._id && (
            <div
              ref={menuRef}
              className="ring-opacity-5 animate-in fade-in zoom-in-95 absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md border bg-white shadow-lg focus:outline-none dark:bg-gray-800"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                      role="menuitem"
                      tabIndex={0}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Update comment
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <button
                  onClick={() =>
                    handleDeleteComment(comment._id, comment.user._id)
                  }
                  className="flex w-full items-center px-4 py-2 text-sm text-red-600 transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-red-400 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                  role="menuitem"
                  tabIndex={0}
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
