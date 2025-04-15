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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  deleteCommentById,
  updateCommentById,
} from "@/lib/actions/comment.action";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Edit, Loader2, MoreVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Global menu state management with subscription pattern
const menuState = {
  activeMenu: null,
  listeners: [],
  setActiveMenu(id) {
    this.activeMenu = id;
    this.listeners.forEach((listener) => listener(id));
  },
  getActiveMenu() {
    return this.activeMenu;
  },
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  },
};

// Custom hook to use global menu state
const useGlobalMenuState = () => {
  const [activeMenu, setLocalActiveMenu] = useState(menuState.getActiveMenu());

  useEffect(() => {
    const unsubscribe = menuState.subscribe(setLocalActiveMenu);
    return unsubscribe;
  }, []);

  return {
    activeMenu,
    setActiveMenu: (id) => menuState.setActiveMenu(id),
  };
};

export default function CommentCard({ comment, path }) {
  const { user, isSignedIn } = useUser();
  const { activeMenu, setActiveMenu } = useGlobalMenuState();
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const dialogContentRef = useRef(null);
  const userCommentDate = format(new Date(comment?.createdAt), "MMMM dd, yyyy");
  const clerkEmail = user?.emailAddresses[0]?.emailAddress;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        dialogContentRef.current &&
        !dialogContentRef.current.contains(event.target)
      ) {
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
  }, [setActiveMenu]);

  // Focus management when menu opens/closes
  useEffect(() => {
    if (activeMenu === comment?._id && menuRef.current) {
      menuRef.current.querySelector("button").focus();
    } else if (menuButtonRef.current) {
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

  const commentSchema = z.object({
    comment: z
      .string()
      .min(5, "Comment must be at least 5 characters")
      .max(500, "Comment must not exceed 500 characters"),
    commentId: z.string(),
    userId: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: comment?.comment || "",
      commentId: comment?._id || "",
      userId: comment?.user?._id || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateCommentById(
        data?.commentId,
        data?.userId,
        path,
        data?.comment,
      );
      toast.success("Comment updated successfully");
    } catch (error) {
      toast.error(error?.message || "Failed to update comment");
    } finally {
      setActiveMenu(null);
      form.reset({
        comment: data.comment,
        commentId: data.commentId,
        userId: data.userId,
      });
    }
  };

  const isMenuActive = activeMenu === comment?._id;

  return (
    <div className="group relative mx-auto w-full max-w-3xl py-2">
      <div className="flex items-start gap-3 sm:gap-4">
        <Image
          src={comment?.user?.profilePicture}
          alt={`${comment?.user?.firstName} ${comment?.user?.lastName}`}
          width={40}
          height={40}
          className="flex-shrink-0 rounded-full sm:h-12 sm:w-12"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-dark-bg dark:text-light-bg truncate text-sm font-semibold sm:text-base">
              {comment.user?.firstName} {comment?.user?.lastName}
            </h4>
            <span className="text-dark-bg dark:text-light-bg text-xs">•</span>
            <p className="text-dark-bg dark:text-medium-bg text-xs sm:text-sm">
              {userCommentDate}
            </p>
            <p>{comment?.createdAt !== comment?.updatedAt && "(edited)"}</p>
          </div>
          <p className="dark:text-light-bg mt-1 text-sm break-words text-gray-700 sm:text-base">
            {comment?.comment}
          </p>
        </div>

        <div className="relative flex-shrink-0">
          <button
            ref={menuButtonRef}
            disabled={!isSignedIn || clerkEmail !== comment?.user?.email}
            onClick={() => setActiveMenu(isMenuActive ? null : comment?._id)}
            className={`cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
              !isSignedIn || clerkEmail !== comment?.user?.email ? "hidden" : ""
            }`}
            aria-expanded={isMenuActive}
            aria-haspopup="true"
            aria-label="Comment options"
          >
            <MoreVertical className="h-5 w-5 text-gray-500 sm:h-6 sm:w-6 dark:text-gray-400" />
          </button>

          {isMenuActive && (
            <div
              ref={menuRef}
              className="ring-opacity-5 animate-in fade-in zoom-in-95 absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md border bg-white shadow-lg focus:outline-none sm:w-52 dark:bg-gray-800"
              style={{ maxWidth: "calc(100vw - 2rem)" }}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="flex w-full cursor-pointer items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                      role="menuitem"
                      tabIndex={0}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Update comment
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent
                    ref={dialogContentRef}
                    className="w-full max-w-md"
                  >
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Update Your Comment
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Edit your comment below. This will update your
                            existing comment.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <FormField
                          control={form.control}
                          name="comment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="sr-only">
                                Your Comment
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Share your thoughts... (Min 5, Max 500 characters)"
                                  className="bg-background focus:ring-primary min-h-[120px] text-sm focus:ring-2 sm:text-base"
                                  onClick={(e) => e.stopPropagation()}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs text-red-500" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="commentId"
                          render={({ field }) => (
                            <FormItem className="hidden">
                              <FormControl>
                                <input type="hidden" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="userId"
                          render={({ field }) => (
                            <FormItem className="hidden">
                              <FormControl>
                                <input type="hidden" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <AlertDialogFooter className="flex flex-col gap-4 sm:flex-row sm:gap-0">
                          <AlertDialogCancel
                            onClick={() => {
                              form.reset({
                                comment: comment?.comment || "",
                                commentId: comment?._id || "",
                                userId: comment?.user?._id || "",
                              });
                              setActiveMenu(null);
                            }}
                            className="w-full sm:w-auto"
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction asChild>
                            <Button
                              type="submit"
                              disabled={form.formState.isSubmitting}
                              className="dark:bg-dark-bg w-full cursor-pointer text-white sm:w-auto"
                              size="lg"
                            >
                              {form.formState.isSubmitting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Updating...
                                </>
                              ) : (
                                "Update Comment"
                              )}
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </form>
                    </Form>
                  </AlertDialogContent>
                </AlertDialog>

                {/* Delete Comment with Confirmation Dialog */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="flex w-full cursor-pointer items-center px-4 py-2 text-sm text-red-600 transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-red-400 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                      role="menuitem"
                      tabIndex={0}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete comment
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this comment? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row sm:gap-0">
                      <AlertDialogCancel
                        className="w-full cursor-pointer sm:w-auto"
                        onClick={() => setActiveMenu(null)}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button
                          className="w-full cursor-pointer text-white sm:w-auto"
                          variant="destructive"
                          onClick={() =>
                            handleDeleteComment(comment._id, comment.user._id)
                          }
                        >
                          Delete
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
