"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

// Define Zod schema
const formSchema = z.object({
  content: z
    .string()
    .min(5, { message: "Content must be at least 5 characters long." })
    .max(1000, { message: "Content cannot exceed 1000 characters." })
    .nonempty({ message: "Content is required." }),
});

export default function AssignmentSubmitForm() {
  // Initialize the form with react-hook-form and Zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    // console.log("Form Data:", data?.content);
    // alert("Assignment submitted successfully!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignment Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your assignment content... (Min 5, Max 1000 characters)"
                  className="bg-background focus:ring-primary min-h-[140px] text-base focus:ring-2"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit Assignment"}
        </Button>
      </form>
    </Form>
  );
}
