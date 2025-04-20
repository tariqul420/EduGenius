"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { InputPhone } from "@/components/shared/InputPhone";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea"; // Added Textarea import
import {
  getAdditionalInfo,
  updateInstructor,
} from "@/lib/actions/instructor.action";

import "react-phone-number-input/style.css";

const formSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\-\s()]*$/, "Invalid phone number format")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must not exceed 100 characters")
    .optional()
    .or(z.literal("")),

  profession: z
    .string()
    .min(1, "Profession is required")
    .max(50, "Profession must not exceed 50 characters")
    .optional()
    .or(z.literal("")),

  education: z
    .string()
    .min(1, "Education is required")
    .max(100, "Education must not exceed 100 characters")
    .optional()
    .or(z.literal("")),

  aboutMe: z
    .string()
    .min(1, "About me is required")
    .max(500, "About me must not exceed 500 characters")
    .optional()
    .or(z.literal("")),

  social: z
    .object({
      facebook: z
        .string()
        .url("Please enter a valid URL")
        .refine((url) => url.includes("facebook.com"), {
          message: "Please enter a valid Facebook URL",
        })
        .optional()
        .or(z.literal("")),
      twitter: z
        .string()
        .url("Please enter a valid URL")
        .refine((url) => url.includes("x.com") || url.includes("x.com"), {
          message: "Please enter a valid Twitter/X URL",
        })
        .optional()
        .or(z.literal("")),
      linkedin: z
        .string()
        .url("Please enter a valid URL")
        .refine((url) => url.includes("linkedin.com"), {
          message: "Please enter a valid LinkedIn URL",
        })
        .optional()
        .or(z.literal("")),
      instagram: z
        .string()
        .url("Please enter a valid URL")
        .refine((url) => url.includes("instagram.com"), {
          message: "Please enter a valid Instagram URL",
        })
        .optional()
        .or(z.literal("")),
    })
    .optional(),
});

export default function AdditionalInfoForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      address: "",
      profession: "",
      education: "",
      aboutMe: "",
      social: {
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
      },
    },
  });

  function onSubmit(values) {
    toast.promise(
      updateInstructor({
        data: values,
        path: "/instructor",
      }),
      {
        loading: "Saving information...",
        success: () => {
          router.refresh();
          return "Information saved successfully!";
        },
        error: (err) => {
          return "Error saving information. Please try again.";
        },
      },
    );
  }

  useEffect(() => {
    const getInfo = async () => {
      setIsLoading(true);
      try {
        const info = await getAdditionalInfo();
        if (info) {
          form.reset({
            phone: info.phone || "",
            address: info.address || "",
            profession: info.profession || "",
            education: info.education || "",
            aboutMe: info.aboutMe || "",
            social: {
              facebook: info.social.facebook || "",
              twitter: info.social.twitter || "",
              linkedin: info.social.linkedin || "",
              instagram: info.social.instagram || "",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching additional info:", error);
        toast.error("Failed to load additional information.");
      } finally {
        setIsLoading(false);
      }
    };
    getInfo();
  }, [form]);

  return !isLoading ? (
    <div>
      <h2 className="text-lg font-semibold">Additional Information</h2>

      <div className="mt-4 border-t border-neutral-300/50 py-4 dark:border-neutral-700/50">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Phone Number</FormLabel>
                    <FormControl>
                      <InputPhone
                        placeholder="Enter phone number"
                        className="outline-none placeholder:text-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your address"
                        {...field}
                        className="placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Profession</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your profession"
                        {...field}
                        className="placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Education</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your education"
                        {...field}
                        className="placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* About Me Section */}
            <FormField
              control={form.control}
              name="aboutMe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">About Me</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself"
                      {...field}
                      className="min-h-[100px] placeholder:text-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Social Media Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="social.facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Facebook Profile</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Facebook profile URL"
                        {...field}
                        className="placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="social.twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Twitter Profile</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Twitter profile URL"
                        {...field}
                        className="placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="social.linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">LinkedIn Profile</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter LinkedIn profile URL"
                        {...field}
                        className="placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="social.instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Instagram Profile</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Instagram profile URL"
                        {...field}
                        className="placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={form.formState.isSubmitting}
            >
              Save Information
            </Button>
          </form>
        </Form>
      </div>
    </div>
  ) : (
    <div className="space-y-4">
      <Skeleton className="h-7 w-1/4" />
      <div className="mt-4 border-t py-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <Skeleton className="mt-6 h-10 w-full" />
      </div>
    </div>
  );
}
