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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import * as z from "zod";

// Define Zod schema
const formSchema = z.object({
  review: z
    .string()
    .min(5, { message: "Review must be at least 5 characters long." })
    .max(500, { message: "Review cannot exceed 500 characters." })
    .nonempty({ message: "Review is required." }),
});

export function RatingModal() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: "",
    },
  });

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handlePointerMove = (value) => {
    setHoverRating(value);
  };

  const handlePointerLeave = () => {
    setHoverRating(0);
  };

  const onSubmit = async ({ review }) => {
    if (rating === 0) return;
    console.log("Submitted:", { rating, review: review });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    form.reset();
    setRating(0);
    setHoverRating(0);
    setOpen(false);
  };

  const handleCancel = () => {
    form.reset();
    setRating(0);
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="cursor-pointer">Give Rating</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Why did you leave this rating?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {getRatingDescription(rating, hoverRating)}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="rating flex justify-center">
          <Rating
            onClick={handleRating}
            initialValue={rating}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                className="cursor-pointer text-gray-900 dark:text-gray-100"
              >
                Cancel
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || rating === 0}
                className="dark:bg-dark-bg w-full cursor-pointer text-white sm:w-auto"
                size="lg"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post Review"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
