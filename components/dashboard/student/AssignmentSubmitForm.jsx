"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileTextIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { studentSubmitAssignment } from "@/lib/actions/assignment.action";

// Define Zod schema
const formSchema = z.object({
  content: z
    .string()
    .min(5, { message: "Content must be at least 5 characters long." })
    .max(1000, { message: "Content cannot exceed 1000 characters." })
    .nonempty({ message: "Content is required." }),
});

export default function AssignmentSubmitForm({ assignment, course }) {
  const pathname = usePathname();

  // Initialize the form with react-hook-form and Zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  // State for character count and submission status
  const [charCount, setCharCount] = useState(0);
  const maxChars = 1000;

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const submittedData = {
        content: data.content,
        assignment,
        course,
      };
      toast.promise(
        studentSubmitAssignment({
          data: submittedData,
          path: pathname,
        }),
        {
          loading: "Saving information...",
          success: () => {
            return "Information saved successfully!";
          },
          error: (err) => {
            throw new Error("Error saving information. Please try again.", err);
          },
        },
      );
      form.reset();
      setCharCount(0);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  // Update character count on content change
  const handleContentChange = (e, onChange) => {
    const { value } = e.target;
    setCharCount(value.length);
    onChange(e);
  };

  return (
    <div className="dark:bg-dark-hover rounded-xl border bg-white p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-dark-main/10 text-dark-main dark:bg-dark-main/20 flex h-10 w-10 items-center justify-center rounded-lg">
          <FileTextIcon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Submit Your Assignment</h2>
          <p className="text-muted-foreground text-sm">
            Provide your assignment content or repository link below.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="Share your assignment content or paste a repository link... (Min 5, Max 1000 characters)"
                      className="bg-background focus:ring-primary min-h-[160px] rounded-lg border-gray-300 text-base transition-all duration-200 focus:border-transparent focus:ring-2 dark:border-gray-700 dark:bg-gray-900"
                      {...field}
                      onChange={(e) => handleContentChange(e, field.onChange)}
                      aria-describedby="char-count"
                    />
                    <div
                      className={`absolute right-3 bottom-3 text-xs ${
                        charCount > maxChars
                          ? "text-red-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {charCount}/{maxChars}
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="mt-1 text-xs text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || charCount > maxChars}
              className="bg-dark-main hover:bg-dark-main/90 dark:text-dark-main rounded-lg px-6 py-2 font-semibold text-white transition-colors duration-200 dark:bg-white dark:hover:bg-white/90"
            >
              {form.formState.isSubmitting
                ? "Submitting..."
                : "Submit Assignment"}
            </Button>
            {form.formState.isSubmitSuccessful && (
              <p className="text-sm text-green-500">Submission successful!</p>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
