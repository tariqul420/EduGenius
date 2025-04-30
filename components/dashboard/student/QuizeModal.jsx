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

export default function QuizModal({ quiz }) {
  const percentage = (quiz?.score / quiz?.totalQuestions) * 100;
  const strokeDash = (percentage / 100) * 251;

  let label = "Needs Practice";
  let icon = <Wrench className="h-5 w-5 text-yellow-500" />;
  let feedback = "Keep practicing to improve your skills!";

  if (quiz?.score >= 17) {
    label = "Excellent!";
    icon = <Trophy className="h-5 w-5 text-green-500" />;
    feedback = "Outstanding performance! You've mastered this material.";
  } else if (quiz?.score >= 13) {
    label = "Good Job";
    icon = <Award className="h-5 w-5 text-blue-500" />;
    feedback = "Solid understanding, but there's room for improvement.";
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        {quiz?.hasSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">
                Quiz Results
              </DialogTitle>
            </DialogHeader>
            <div className="my-4 flex flex-col items-center gap-6">
              {/* Score Circle */}
              <div className="relative h-40 w-40">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  {/* Full colored background circle */}
                  <circle
                    className="text-dark-btn"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  {/* Gray progress indicator on top */}
                  <circle
                    className="text-main"
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
                      strokeDashoffset: 0,
                      animationFillMode: "forwards",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                  <span className="text-dark-main text-3xl font-bold dark:text-white">
                    {quiz?.score}/{quiz?.totalQuestions}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {Math.round(percentage)}% Correct
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
              <div className="mx-auto w-11/12 border-t pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Correct: {quiz?.score}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    <span>Incorrect: {quiz?.totalQuestions - quiz?.score}</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:justify-center">
              <Button
                className="bg-main dark:bg-dark-main rounded-full px-6 text-white"
                type="button"
                asChild
              >
                <Link href={`/student/quiz/${quiz?.course?.slug ?? "#"}`}>
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
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="dark:text-dark-btn flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Quiz Instructions
              </DialogTitle>
            </DialogHeader>

            <div className="bg-light-bg dark:bg-dark-bg my-4 rounded-lg p-4">
              <h4 className="text-foreground mb-2 font-medium">
                Before you start:
              </h4>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Ensure you have a stable internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Find a quiet place with no distractions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Have any allowed materials ready</span>
                </li>
              </ul>
            </div>

            <DialogFooter className="flex-col gap-2 sm:flex-row-reverse">
              <Button
                className="bg-main hover:bg-dark-main rounded-full px-6 text-white"
                type="button"
                asChild
              >
                <Link href={`/student/quiz/${quiz?.course?.slug}`}>
                  Start Quiz Now
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
