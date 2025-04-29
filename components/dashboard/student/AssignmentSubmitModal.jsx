"use client";
import { AlertCircle, Award, Clock, Trophy, Wrench } from "lucide-react";
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

export default function AssignmentSubmitModal({ assignment }) {
  // Initialize defaults
  let label = "Needs Improvement";
  let icon = <Wrench className="text-main h-5 w-5" />;
  let feedback = "Review the requirements and try to enhance your submission.";
  let percentage = 0;
  let isPassing = false;

  if (
    assignment?.hasSubmitted &&
    assignment?.mark !== null &&
    assignment?.totalMarks > 0
  ) {
    percentage = (assignment.mark / assignment.totalMarks) * 100;
    isPassing = assignment.mark >= (assignment.passMark ?? 0);

    if (percentage >= 85) {
      label = "Excellent Work!";
      icon = <Trophy className="h-5 w-5 text-green-500" />;
      feedback = `Exceptional effort! Your submission meets all expectations. ${
        isPassing
          ? "You passed!"
          : "However, you did not meet the passing mark."
      }`;
    } else if (percentage >= 65) {
      label = "Good Effort";
      icon = <Award className="h-5 w-5 text-blue-500" />;
      feedback = `Well done, but there’s room to polish your work. ${
        isPassing ? "You passed!" : "You did not meet the passing mark."
      }`;
    } else {
      label = "Needs Improvement";
      icon = <Wrench className="h-5 w-5 text-yellow-500" />;
      feedback = `Review the requirements and try to enhance your submission. ${
        isPassing ? "You passed!" : "You did not meet the passing mark."
      }`;
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-black w-full px-6 dark:text-white"
        >
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        {assignment?.hasSubmitted && assignment?.mark > 0 ? (
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
                    className="text-main"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-green-500"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                  <span className="text-dark-main text-3xl font-bold">
                    {assignment?.mark ?? 0}/{assignment?.totalMarks ?? 0}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {percentage.toFixed(1)}%
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
            </div>
            <DialogFooter className="gap-2 sm:justify-center">
              <Button
                className="bg-main dark:bg-dark-main rounded-full px-6 text-white"
                type="button"
                asChild
              >
                <Link
                  href={`/student/assignment/${
                    assignment?.course?.slug ?? "#"
                  }`}
                >
                  View Details
                </Link>
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-full px-6"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        ) : assignment?.hasSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">
                Submission Pending
              </DialogTitle>
            </DialogHeader>
            <div className="my-4 flex flex-col items-center gap-6">
              <Clock className="text-main h-12 w-12" />
              <div className="space-y-2 text-center">
                <p className="text-muted-foreground max-w-xs text-sm">
                  Your assignment has been submitted and is awaiting grading.
                  Check back later for your results.
                </p>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:justify-center">
              <Button
                className="bg-main hover:bg-dark-main dark:hover:bg-dark-bg rounded-full px-6 text-white"
                type="button"
                asChild
              >
                <Link
                  href={`/student/assignment/${
                    assignment?.course?.slug ?? "#"
                  }`}
                >
                  View Details
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

            <div className="my-4 rounded-lg p-4">
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
                className="bg-main hover:bg-dark-main dark:hover:bg-dark-bg rounded-full px-6 text-white"
                type="button"
                asChild
              >
                <Link
                  href={`/student/assignment/${
                    assignment?.course?.slug ?? "#"
                  }`}
                >
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
