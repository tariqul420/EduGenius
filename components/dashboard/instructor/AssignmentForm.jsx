"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import AISheet from "./AISheet";
import AiAssDetails from "./AiAssDetails";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  createAssignment,
  updateAssignment,
} from "@/lib/actions/assignment.action";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(100, { message: "Title must be at most 100 characters." }),
  deadline: z.date(),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  totalMarks: z
    .number()
    .positive({ message: "Total marks must be a positive number." })
    .int({ message: "Total marks must be an integer." }),
  passMarks: z
    .number()
    .int({ message: "Pass marks must be an integer." })
    .positive({ message: "Total marks must be a positive number." })
    .optional(), // Make it optional
});

export default function AssignmentForm({ assignment, course }) {
  const pathname = usePathname();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: assignment?.title || "", // Default to empty string if no quiz title is provided
      deadline: assignment?.deadline ? new Date(assignment?.deadline) : "", // Default to current date if no quiz deadline is provided
      description: assignment?.description || "", // Default to empty string if no quiz description is provided
      totalMarks: assignment?.totalMarks || "", // Default to 0 if no quiz total marks are provided
      passMarks: assignment?.passMarks || "", // Default to 0 if no quiz pass marks are provided
    },
  });

  // eslint-disable-next-line no-unused-vars
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions", // Match the name with the defaultValues structure
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    if (assignment) {
      toast.promise(
        updateAssignment({
          assignmentId: assignment._id,
          data: values,
          path: pathname,
        }),
        {
          loading: "Updating assignment...",
          success: (data) => {
            if (data.success) {
              return "Assignment updated successfully!";
            } else {
              throw new Error(data.message || "Failed to update assignment.");
            }
          },
          error: (error) => error.message,
        },
      );
    } else {
      toast.promise(
        createAssignment({
          courseId: course._id,
          data: values,
          path: pathname,
        }),
        {
          loading: "Creating assignment...",
          success: (data) => {
            if (data.success) {
              return "Assignment created successfully!";
            } else {
              throw new Error(data.message || "Failed to create assignment.");
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
            <FormItem className="max-md:col-span-2">
              <FormLabel>Assignment Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter assignment title"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* deadline */}
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className="max-md:col-span-2">
              <FormLabel>Deadline</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(new Date(field.value), "PPP") // Format the selected date
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                    {/* Select Options */}
                    <Select
                      onValueChange={(value) => {
                        const selectedDate = addDays(
                          new Date(),
                          parseInt(value),
                        );
                        field.onChange(selectedDate); // Update the form state
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="0">Today</SelectItem>
                        <SelectItem value="1">Tomorrow</SelectItem>
                        <SelectItem value="3">In 3 days</SelectItem>
                        <SelectItem value="7">In a week</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Calendar */}
                    <div className="rounded-md border">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : null} // Pass the selected date
                        onSelect={(value) => {
                          field.onChange(value); // Update the form state
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* totalMarks  */}
        <FormField
          control={form.control}
          name="totalMarks"
          render={({ field }) => (
            <FormItem className="max-md:col-span-2">
              <FormLabel>Total Marks</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter total marks"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* passMarks */}
        <FormField
          control={form.control}
          name="passMarks"
          render={({ field }) => (
            <FormItem className="max-max-md:col-span-2">
              <FormLabel>Pass Marks</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter pass marks"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-1 sm:col-span-2">
              <div className="flex items-center justify-between">
                <FormLabel>Assignment Description</FormLabel>
                <AISheet value={field.value}>
                  <AiAssDetails
                    desc={field.value}
                    category={course?.category}
                    title={course?.title}
                    level={course?.level}
                    onSelect={field.onChange}
                  />
                </AISheet>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Enter course description"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="col-span-1 sm:col-span-2">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {assignment ? "Update Assignment" : "Create Assignment"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
