"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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
  getReview,
  saveReview,
  updateReview,
} from "@/lib/actions/review.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MessagesSquare } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { toast } from "sonner";
import * as z from "zod";

// Define Zod schema
const formSchema = z.object({
  review: z
    .string()
    .min(5, { message: "Review must be at least 5 characters long." })
    .max(500, { message: "Review cannot exceed 500 characters." })
    .nonempty({ message: "Review is required." }),
});

export function RatingModal({ course }) {
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: "",
    },
  });

  // Handle modal open/close and fetch review
  const handleOpenChange = async (isOpen) => {
    setOpen(isOpen);
    if (isOpen) {
      try {
        setLoading(true);
        const fetchedReview = await getReview({ course });
        if (fetchedReview) {
          setReview(fetchedReview);
          setRating(fetchedReview?.rating);
          form.setValue("review", fetchedReview?.review);
        } else {
          setReview(null);
          setRating(0);
          form.reset({ review: "" });
        }
      } catch (error) {
        toast.error("Failed to load review.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handlePointerMove = (value) => {
    setHoverRating(value);
  };

  const handlePointerLeave = () => {
    setHoverRating(0);
  };

  const onSubmit = async ({ review: reviewText }) => {
    if (rating === 0) return;

    const ratingData = {
      course,
      rating,
      review: reviewText,
    };

    try {
      if (!review) {
        await saveReview({ reviewData: ratingData });
      } else {
        await updateReview({ rating, review: reviewText, course });
      }
      form.reset();
      // setReview(null);
      // setRating(0);
      // setHoverRating(0);
      setOpen(false);
      toast.success(review ? "Review Updated!" : "Review Submitted!");
    } catch (error) {
      toast.error("Failed to save review.");
    }
  };

  const handleCancel = () => {
    form.reset();
    setRating(review?.rating || 0);
    setHoverRating(0);
    setOpen(false);
  };

  // Define rating descriptions
  const getRatingDescription = (rating, hoverRating) => {
    const activeRating = hoverRating || rating;
    switch (activeRating) {
      case 0:
        return "Select a rating.";
      case 1:
        return "Awful, not what I expected at all.";
      case 2:
        return "Poor, quite disappointing.";
      case 3:
        return "Average, it was okay.";
      case 4:
        return "Good, met my expectations.";
      case 5:
        return "Excellent, absolutely loved it!";
      default:
        return "Select a rating.";
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <button className="border-green bg-main hover:bg-dark-main hover:text-medium-bg flex cursor-pointer items-center gap-2 rounded border px-3 py-1.5 text-white duration-200">
          <MessagesSquare size={18} />
          Feedback
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            {review ? "Edit Your Review" : "Why did you leave this rating?"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {getRatingDescription(rating, hoverRating)}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <>
            <div className="rating flex justify-center">
              <Rating
                onClick={handleRating}
                initialValue={rating}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
              />
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="review"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Your review</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your thoughts... (Min 5, Max 500 characters)"
                          className="bg-background focus:ring-primary min-h-[140px] text-base focus:ring-2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <AlertDialogCancel
                    type="button"
                    onClick={handleCancel}
                    disabled={form.formState.isSubmitting}
                    className="cursor-pointer rounded text-gray-900 dark:text-gray-100"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting || rating === 0}
                    className="dark:bg-dark-bg w-full cursor-pointer rounded text-white sm:w-auto"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Posting...
                      </>
                    ) : review ? (
                      "Update Review"
                    ) : (
                      "Post Review"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
