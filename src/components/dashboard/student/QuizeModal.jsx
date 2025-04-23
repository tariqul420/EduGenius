"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function QuizeModal({ slug }) {
  const isSumbitted = false;
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Details
          </Button>
        </DialogTrigger>
        <DialogContent>
          {isSumbitted ? (
            <>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <div className="my-6 flex justify-center">
                <div className="relative h-32 w-32">
                  {/* Background circle */}
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    {/* Progress circle */}
                    <circle
                      className="text-green-500"
                      strokeWidth="8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray={`${(16 / 20) * 251} 251`} // 251 is ~2*π*r
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  {/* Center text */}
                  <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center">
                    <span className="text-2xl font-bold">
                      {16}/{20}
                    </span>
                    <span className="text-sm text-gray-500">
                      Correct Answers
                    </span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button type="button" variant="secondary">
                  <Link href={`/student/courses/${slug}`}>Progress Bar</Link>
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button type="button" variant="secondary">
                  <Link href={`/student/courses/${slug}`}>Start Quize</Link>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
