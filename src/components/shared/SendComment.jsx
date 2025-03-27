"use client";

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
import { postComment } from "@/lib/actions/comment.action";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  comment: z
    .string()
    .min(5, {
      message: "Comment must be at least 5 characters long.",
    })
    .max(1000, {
      message: "Comment must be less than 1000 characters.",
    }),
});

export function SendComment({ blogId, userId, slug }) {
  const { user, isSignedIn } = useUser();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (values) => {
    if (!isSignedIn || !user) return;
    form.reset({ comment: "" });
    const toastId = toast.loading("Comment Posting...");

    try {
      const comment = {
        blog: blogId,
        user: userId,
        comment: values.comment,
        path: `/blogs/${slug}`,
      };

      await postComment(comment);
      toast.success("Comment posted!");
    } catch (error) {
      toast.error("Something went wrong");
      // Revert form value if error occurs
      form.setValue("comment", values.comment);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="bg-card mt-12 rounded-lg border p-6 shadow-md">
      <h3 className="text-dark-bg dark:text-light-bg mb-5 text-xl font-semibold">
        Join the Conversation
      </h3>
      <div className="flex items-start gap-4">
        {user && (
          <div className="shrink-0">
            <Image
              src={
                user?.imageUrl ||
                "https://cdn.pixabay.com/photo/2024/05/27/08/21/fantasy-8790369_960_720.jpg"
              }
              alt={`${user?.fullName || "User"}'s profile`}
              width={40}
              height={40}
              className="border-primary/20 rounded-full border-2"
              priority
            />
          </div>
        )}

        <div className="flex-1">
          {user ? (
            <p className="text-dark-bg/50 dark:text-medium-bg mb-3 text-sm font-medium">
              Commenting as{" "}
              <span className="text-dark-bg dark:text-light-bg">
                {user?.fullName}
              </span>
            </p>
          ) : (
            <p className="text-dark-bg dark:text-medium-bg mb-3 text-sm font-medium">
              Sign in to leave a comment
            </p>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Your Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your thoughts... (Min 5 characters)"
                        className="bg-background focus:ring-primary min-h-[140px] text-base focus:ring-2"
                        disabled={!isSignedIn}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!isSignedIn || form.formState.isSubmitting}
                  className="dark:bg-dark-bg w-full cursor-pointer text-white sm:w-auto"
                  size="lg"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    "Post Comment"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
