"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import AIQuiz from "./AIQuiz";
import AISheet from "./AISheet";

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

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(100, { message: "Title must be at most 100 characters." }),
  questions: z.array(
    z.object({
      question: z
        .string()
        .min(2, { message: "Question must be at least 2 characters." })
        .max(100, { message: "Question must be at most 100 characters." }),
      options: z
        .array(
          z.object({
            option: z.string().min(1, { message: "Option cannot be empty." }),
            isCorrect: z.boolean().default(false),
          }),
        )
        .min(2, { message: "At least two options are required." })
        .refine(
          (options) => {
            const correctOptions = options.filter((opt) => opt.isCorrect);
            return correctOptions.length >= 1;
          },
          {
            message: "At least one option must be marked as correct",
          },
        ),
    }),
  ),
});

export default function QuizForm({ quiz, course }) {
  const pathname = usePathname();
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
          path: pathname,
        }),
        {
          loading: "Updating quiz...",
          success: () => {
            return "Quiz updated successfully!";
          },
          error: (error) => error.message,
        },
      );
    } else {
      toast.promise(
        createQuiz({
          courseId: course._id,
          data: values,
          path: pathname,
        }),
        {
          loading: "Creating quiz...",
          success: (data) => {
            if (data.success) {
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
              <div className="flex items-center justify-between">
                <FormLabel>Quiz Title</FormLabel>
                <AISheet value={field.value}>
                  <AIQuiz
                    title={course.title}
                    desc={course.description}
                    category={course.category}
                    level={course.level}
                    onSelect={append}
                  />
                </AISheet>
              </div>
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
                            // eslint-disable-next-line no-shadow
                            render={({ field, formState }) => (
                              <FormItem className="flex items-center gap-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value} // Bind the checkbox state to the form field value
                                    onCheckedChange={field.onChange} // Update the form state when toggled
                                  />
                                </FormControl>
                                <FormLabel>Option-{optionIndex + 1}</FormLabel>
                                <FormMessage>
                                  {
                                    formState.errors?.questions?.[index]
                                      ?.options?.root?.message
                                  }
                                </FormMessage>
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
