"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
});

export function EditCategoryModal({ category }) {
  const [openModal, setOpenModal] = useState(false);
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
          throw new Error("Error saving information. Please try again.", err);
        },
      });

      setOpenModal(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <Button
        variant="ghost"
        className="w-full text-left"
        onClick={() => setOpenModal(true)}
      >
        Edit Category
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"text-center"}>Edit Category</DialogTitle>
          <DialogDescription className={"text-center"}>
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
                onClick={() => setOpenModal(false)}
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
