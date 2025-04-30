import {
  ClockIcon,
  FileTextIcon,
  LockIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-4 px-4 lg:px-6">
        {/* Header Section Skeleton */}
        <div className="dark:bg-dark-bg relative overflow-hidden rounded-xl bg-white p-6">
          <div className="relative z-10">
            <div className="mb-1 flex items-center gap-2">
              <LockIcon className="text-dark-main/80 h-5 w-5 dark:text-white/80" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-3/4 md:h-10" />
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1">
                <ClockIcon className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1">
                <ShieldIcon className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1">
                <UserIcon className="h-4 w-4" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
        </div>

        {/* Assignment Description Skeleton */}
        <div className="dark:bg-dark-bg relative overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800">
          <div className="p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                <FileTextIcon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="mt-2 h-4 w-1/2" />
                <Skeleton className="mt-2 h-3 w-1/4" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
            <Skeleton className="mt-2 h-4 w-3/4" />
          </div>
        </div>

        {/* Submission Section Skeleton */}
        <div className="dark:bg-dark-bg rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800">
          <Skeleton className="mb-4 h-6 w-1/4" />
          <div className="space-y-4">
            {/* Submitted Work Skeleton */}
            <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-900">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                  <FileTextIcon className="h-5 w-5" />
                </div>
                <Skeleton className="h-5 w-1/4" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-5/6" />
            </div>

            {/* Status/Result Skeleton */}
            <div className="flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm dark:bg-gray-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                <ClockIcon className="h-5 w-5" />
              </div>
              <div>
                <Skeleton className="h-4 w-16" />
                <Skeleton className="mt-2 h-5 w-32" />
                <Skeleton className="mt-2 h-3 w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
