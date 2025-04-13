"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createQuiz, updateQuiz } from "@/lib/actions/quiz.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(100, { message: "Title must be at most 100 characters." }),
  questions: z.array(
    z.object({
      question: z
        .string()
        .min(2, { message: "Lesson title must be at least 2 characters." })
        .max(100, { message: "Lesson title must be at most 100 characters." }),
      options: z
        .array(
          z.object({
            option: z.string().min(1, { message: "Option cannot be empty." }),
            isCorrect: z.boolean(),
          }),
        )
        .min(2, { message: "At least two options are required." }),
    }),
  ),
});

export default function QuizForm({ quiz, courseId, slug }) {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: quiz?.title || "", // Default to empty string if no quiz title is provided
      questions: quiz?.questions || [
        {
          question: "",
          options: [
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
          ], // Default to two empty options
        },
      ], // Default to one empty question
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions", // Match the name with the defaultValues structure
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    if (quiz) {
      toast.promise(
        updateQuiz({
          quizId: quiz._id,
          data: values,
          path: `/instructor/courses/${slug}`,
        }),
        {
          loading: "Updating quiz...",
          success: (data) => {
            if (data.success) {
              router.push(`/instructor/courses/${slug}`);
              return "Quiz updated successfully!";
            } else {
              throw new Error(data.message || "Failed to update quiz.");
            }
          },
          error: (error) => error.message,
        },
      );
    } else {
      toast.promise(
        createQuiz({
          courseId,
          data: values,
        }),
        {
          loading: "Creating quiz...",
          success: (data) => {
            if (data.success) {
              router.push("/instructor/courses");
              return "Quiz created successfully!";
            } else {
              throw new Error(data.message || "Failed to create quiz.");
            }
          },
          error: (error) => error.message,
        },
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8"
      >
        {/* Quiz Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Quiz Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter quiz title"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dynamic Questions */}
        <div className="col-span-2 space-y-5">
          {fields.map((question, index) => (
            <div key={question.id} className="flex w-full flex-col gap-5">
              {/* Question */}
              <div className="flex w-full items-end gap-5">
                <FormField
                  control={form.control}
                  name={`questions.${index}.question`} // Use "questions" instead of "quiz"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter question" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Remove Question Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => remove(index)}
                  className="w-fit"
                >
                  <Minus strokeWidth={1} />
                </Button>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {fields[index].options.map((option, optionIndex) => (
                  <FormField
                    key={optionIndex}
                    control={form.control}
                    name={`questions.${index}.options.${optionIndex}.option`} // Use "questions" instead of "quiz"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          <FormField
                            control={form.control}
                            name={`questions.${index}.options.${optionIndex}.isCorrect`} // Bind to the correct field
                            render={({ field }) => (
                              <FormItem className="flex items-center gap-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value} // Bind the checkbox state to the form field value
                                    onCheckedChange={field.onChange} // Update the form state when toggled
                                  />
                                </FormControl>
                                <FormLabel>Option-{optionIndex + 1}</FormLabel>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter option" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Add Another Question Button */}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                question: "",
                options: [
                  { option: "", isCorrect: false },
                  { option: "", isCorrect: false },
                  { option: "", isCorrect: false },
                  { option: "", isCorrect: false },
                ],
              })
            } // Add a new question
            className="mt-4 w-fit"
          >
            <Plus strokeWidth={1} />
            Add another question
          </Button>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 sm:col-span-2">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {quiz ? "Update Quiz" : "Create Quiz"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
