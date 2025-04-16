"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateCategory } from "@/lib/actions/category.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
});

export function EditCategoryModal({ category }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Initialize the form with React Hook Form and Zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.name || "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      toast.promise(updateCategory(category?._id, data?.name), {
        loading: "Saving information...",
        success: () => {
          router.refresh();
          return "Information saved successfully!";
        },
        error: (err) => {
          return "Error saving information. Please try again.";
        },
      });

      setOpen(false);
    } catch (error) {}
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        className="w-full text-left"
        onClick={() => setOpen(true)}
      >
        Edit Category
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={`text-center`}>Edit Category</DialogTitle>
          <DialogDescription className={`text-center`}>
            Modify the category details below. Changes can be saved or canceled.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
