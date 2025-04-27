"use client";
import { AlertCircle, Award, Trophy, Wrench } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AssignmentSubmitModal({
  assignmentId,
  hasSubmitted,
  slug,
}) {
  const score = 16;
  const total = 20;
  const percentage = (score / total) * 100;
  const strokeDash = (percentage / 100) * 251;

  let label = "Needs Improvement";
  let icon = <Wrench className="h-5 w-5 text-yellow-500" />;
  let feedback = "Review the requirements and try to enhance your submission.";

  if (score >= 17) {
    label = "Excellent Work!";
    icon = <Trophy className="h-5 w-5 text-green-500" />;
    feedback = "Exceptional effort! Your submission meets all expectations.";
  } else if (score >= 13) {
    label = "Good Effort";
    icon = <Award className="h-5 w-5 text-blue-500" />;
    feedback = "Well done, but there’s room to polish your work.";
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        {hasSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">
                Assignment Results
              </DialogTitle>
            </DialogHeader>
            <div className="my-4 flex flex-col items-center gap-6">
              {/* Score Circle */}
              <div className="relative h-40 w-40">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    className="text-main dark:text-dark-500"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-gray-200 dark:text-gray-700"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    strokeDasharray={`${strokeDash} 251`}
                    transform="rotate(-90 50 50)"
                    style={{
                      strokeDashoffset: 251,
                      animationFillMode: "forwards",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                  <span className="text-dark-main text-3xl font-bold dark:text-white">
                    {score}/{total}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {Math.round(percentage)}% Grade
                  </span>
                </div>
              </div>

              {/* Result Feedback */}
              <div className="space-y-2 text-center">
                <div className="flex items-center justify-center gap-2 text-lg font-medium">
                  {icon}
                  <span>{label}</span>
                </div>
                <p className="text-muted-foreground max-w-xs text-sm">
                  {feedback}
                </p>
              </div>

              {/* Breakdown */}
              <div className="w-full border-t pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Earned: {score}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    <span>Missed: {total - score}</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:justify-center">
              <Button
                className="bg-main hover:bg-dark-main rounded-full px-6 text-white"
                type="button"
                asChild
              >
                <Link
                  href={`/student/courses/${slug}/${assignmentId}/feedback`}
                >
                  Review Feedback
                </Link>
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="hover:bg-medium-bg dark:hover:bg-dark-bg rounded-full px-6"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="dark:text-dark-btn flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Assignment Instructions
              </DialogTitle>
            </DialogHeader>

            <div className="bg-light-bg dark:bg-dark-bg my-4 rounded-lg p-4">
              <h4 className="text-foreground mb-2 font-medium">
                Before You Submit:
              </h4>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>
                    Follow the assignment guidelines and rubric carefully.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Ensure your submission is in the correct format.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Submit before the deadline to avoid penalties.</span>
                </li>
              </ul>
            </div>

            <DialogFooter className="flex-col gap-2 sm:flex-row-reverse">
              <Button
                className="bg-main hover:bg-dark-main rounded-full px-6 text-white"
                type="button"
                asChild
              >
                <Link href={`/student/assignment/${slug}`}>
                  Submit Assignment
                </Link>
              </Button>
              <DialogClose asChild>
                <Button
                  className="bg-light-bg dark:bg-dark-bg hover:bg-medium-bg dark:hover:bg-dark-input text-foreground rounded-full px-6"
                  type="button"
                  variant="secondary"
                >
                  I&apos;ll Do It Later
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
