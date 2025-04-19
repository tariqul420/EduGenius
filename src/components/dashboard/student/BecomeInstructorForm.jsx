"use client";

import { InputPhone } from "@/components/shared/InputPhone";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Textarea } from "@/components/ui/textarea";
import {
  getInstructorInfoUser,
  saveInstructorInfo,
} from "@/lib/actions/instructor.info.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\-\s()]*$/, "Invalid phone number format")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits"),

  expertise: z
    .string()
    .min(1, "Area of expertise is required")
    .max(100, "Area of expertise must not exceed 100 characters"),

  profession: z
    .string()
    .min(1, "Profession is required")
    .max(50, "Profession must not exceed 50 characters"),

  education: z
    .string()
    .min(1, "Education is required")
    .max(100, "Education must not exceed 100 characters"),

  address: z.object({
    city: z
      .string()
      .min(1, "City is required")
      .max(50, "City must not exceed 50 characters"),

    country: z
      .string()
      .min(1, "Country is required")
      .max(50, "Country must not exceed 50 characters"),
  }),

  experience: z
    .string()
    .min(10, "Teaching experience must be at least 10 characters")
    .max(300, "Teaching experience must not exceed 300 characters"),

  motivation: z
    .string()
    .min(20, "Motivation statement must be at least 20 characters")
    .max(300, "Motivation statement must not exceed 300 characters"),

  teachingStyle: z
    .string()
    .min(1, "Teaching style is required")
    .max(300, "Teaching style must not exceed 300 characters"),
});

export default function BecomeInstructorForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [instructorStatus, setInstructorStatus] = useState(null);
  const [formDisabled, setFormDisabled] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      expertise: "",
      profession: "",
      education: "",
      address: {
        city: "",
        country: "",
      },
      experience: "",
      motivation: "",
      teachingStyle: "",
    },
  });

  async function onSubmit(values) {
    toast.promise(
      saveInstructorInfo({
        data: values,
        path: "/student",
      }),
      {
        loading: "Saving information...",
        success: (response) => {
          if (response.exists) {
            setInstructorStatus(response.status);
            setFormDisabled(true);
            return "You already have an instructor profile.";
          }
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
        const info = await getInstructorInfoUser();
        if (info) {
          // If info exists, disable the form and show status
          setFormDisabled(true);
          setInstructorStatus(info.status);

          form.reset({
            phone: info?.phone || "",
            expertise: info?.expertise || "",
            profession: info?.profession || "",
            education: info?.education || "",
            address: {
              city: info?.address?.city || "",
              country: info?.address?.country || "",
            },
            experience: info?.experience || "",
            motivation: info?.motivation || "",
            teachingStyle: info?.teachingStyle || "",
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

  // Function to get status color and message
  const getStatusInfo = (status) => {
    switch (status) {
      case "approved":
        return {
          color: "bg-light-bg dark:bg-dark-hover border text-green-600",
          message: "Your instructor application has been approved!",
        };
      case "rejected":
        return {
          color: "bg-light-bg dark:bg-dark-hover border text-red-600",
          message: "Your instructor application was not approved at this time.",
        };
      case "pending":
      default:
        return {
          color: "bg-light-bg dark:bg-dark-hover border text-yellow-600",
          message: "Your instructor application is currently under review.",
        };
    }
  };

  return !isLoading ? (
    <div>
      <h2 className="text-lg font-semibold">Become an Instructor</h2>

      <div className="mt-4 border-t border-neutral-300/50 py-4 dark:border-neutral-700/50">
        {instructorStatus && (
          <Alert className={`mb-6 ${getStatusInfo(instructorStatus).color}`}>
            <AlertTitle>
              Application Status:{" "}
              {instructorStatus.charAt(0).toUpperCase() +
                instructorStatus.slice(1)}
            </AlertTitle>
            <AlertDescription>
              {getStatusInfo(instructorStatus).message}
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Phone Number *</FormLabel>
                    <FormControl>
                      <InputPhone
                        placeholder="Enter phone number"
                        className="outline-none placeholder:text-xs"
                        {...field}
                        disabled={formDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Area of Expertise *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g. Web Development, Data Science, Design"
                        {...field}
                        className="placeholder:text-xs"
                        disabled={formDisabled}
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
                    <FormLabel className="text-xs">
                      Current Profession *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g. Software Engineer, UX Designer"
                        {...field}
                        className="placeholder:text-xs"
                        disabled={formDisabled}
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
                    <FormLabel className="text-xs">Education *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g. Master's in Computer Science"
                        {...field}
                        className="placeholder:text-xs"
                        disabled={formDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">City *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your City"
                        {...field}
                        className="placeholder:text-xs"
                        disabled={formDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Country *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Country"
                        {...field}
                        className="placeholder:text-xs"
                        disabled={formDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Experience Section */}
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">
                    Teaching Experience *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your previous teaching or industry experience."
                      {...field}
                      className="min-h-[100px] placeholder:text-xs"
                      disabled={formDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Motivation section */}
            <FormField
              control={form.control}
              name="motivation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">
                    Why do you want to become an instructor? *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your motivation to teach."
                      {...field}
                      className="min-h-[100px] placeholder:text-xs"
                      disabled={formDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teachingStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Teaching Style *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your approach to teaching."
                      {...field}
                      className="min-h-[80px] placeholder:text-xs"
                      disabled={formDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!formDisabled && (
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={form.formState.isSubmitting}
              >
                Save Information
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  ) : (
    <div className="space-y-4">
      <Skeleton className="h-7 w-1/4" />
      <div className="mt-4 border-t py-4">
        {/* Personal Information Skeleton */}
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
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Experience and Motivation Skeletons */}
        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-24 w-full" />
        </div>

        <Skeleton className="mt-6 h-10 w-full" />
      </div>
    </div>
  );
}
